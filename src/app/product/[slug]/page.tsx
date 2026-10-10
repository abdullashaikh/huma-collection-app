import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductItem } from '../../../types';
import { FALLBACK_PRODUCTS } from '../../../lib/fallback-data';
import { ProductDetailClient } from '../../burqa/[slug]/ProductDetailClient';

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
    return { title: 'Product Not Found | Huma Hijab Collection' };
  }

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.s3Url ||
    'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85';

  return {
    title: product.seoTitle || `${product.name} | Huma Hijab Collection`,
    description: product.seoDescription || product.shortDescription,
    alternates: {
      canonical: product.canonicalUrl || `https://humahijabcollection.com/product/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `https://humahijabcollection.com/product/${product.slug}`,
      images: [{ url: primaryImage, width: 1200, height: 630, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.s3Url ||
    'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85';

  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.map((i) => i.s3Url) || [primaryImage],
    description: product.shortDescription,
    sku: product.skuBase,
    brand: {
      '@type': 'Brand',
      name: 'Huma Hijab Collection',
    },
    offers: {
      '@type': 'Offer',
      url: `https://humahijabcollection.com/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.salePrice || product.basePrice || (product as any).sale_price || (product as any).base_price || 0,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating || 5,
      reviewCount: product.reviewCount || 1,
    },
  };

  const categoryName = product.categoryName || 'Collection';
  const categorySlug = product.categorySlug || 'collection';

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://humahijabcollection.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `https://humahijabcollection.com/category/${categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://humahijabcollection.com/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
