import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ProductItem } from '../../../types';
import { FALLBACK_PRODUCTS } from '../../../lib/fallback-data';
import { getMediaUrl } from '../../../lib/media';
import {
  SITE_CONFIG,
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProductJsonLd,
} from '../../../lib/seo';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: { slug: string };
}

async function getProduct(slug: string): Promise<ProductItem | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products/${slug}`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (err) {
    console.warn('API unavailable for product detail, checking local fallback catalog.');
  }

  const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
  return fallback || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  const rawPrimaryImage =
    product.images?.find((img) => img.isPrimary)?.s3Url ||
    product.images?.[0]?.s3Url ||
    (product as any).primaryImageUrl ||
    (product as any).primary_image_url ||
    SITE_CONFIG.defaultOgImage;
  const primaryImage = getMediaUrl(rawPrimaryImage);

  const title = product.seoTitle || `${product.name} | ${SITE_CONFIG.brandName}`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `Shop ${product.name} crafted with ${product.fabric || 'luxury modest fabric'} at ${SITE_CONFIG.brandName}.`;

  return buildPageMetadata({
    title,
    description,
    path: `/burqa/${product.slug}`,
    ogImage: primaryImage,
  });
}

export default async function BurqaProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Canonical route enforcement: non-burqa products live at /product/[slug]
  const isBurqa =
    product.categorySlug === 'burqa' ||
    (product as any).category_slug === 'burqa' ||
    product.categoryId === 1 ||
    (product as any).category_id === 1;

  if (!isBurqa) {
    redirect(`/product/${product.slug}`);
  }

  const canonicalUrl = absoluteUrl(`/burqa/${product.slug}`);

  const rawPrimaryImage =
    product.images?.find((img) => img.isPrimary)?.s3Url ||
    product.images?.[0]?.s3Url ||
    (product as any).primaryImageUrl ||
    (product as any).primary_image_url ||
    SITE_CONFIG.defaultOgImage;
  const primaryImage = getMediaUrl(rawPrimaryImage);

  const allImages =
    product.images && product.images.length > 0
      ? product.images.map((i) => getMediaUrl(i.s3Url))
      : [primaryImage];

  // Google-compliant Product structured data (no fake ratings/reviews)
  const productJsonLd = buildProductJsonLd(product, canonicalUrl, allImages);

  // Crawlable Breadcrumbs schema
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Burqa Collection', path: '/burqa' },
    { name: product.name, path: `/burqa/${product.slug}` },
  ]);

  // Ensure related products are populated for rich internal linking
  const enrichedProduct: ProductItem = {
    ...product,
    relatedProducts:
      product.relatedProducts && product.relatedProducts.length > 0
        ? product.relatedProducts
        : FALLBACK_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={enrichedProduct} />
    </>
  );
}
