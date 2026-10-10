export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  stockQuantity: number;
  lowStockThreshold: number;
  weightGrams?: number;
  barcode?: string | null;
  isActive: boolean;
  attributes?: Record<string, string>;
  size_value?: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  s3Key: string;
  s3Url: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
  viewType?: 'front' | 'back' | 'side' | 'detail' | '360' | string;
}

export interface Product {
  id: number;
  categoryId: number;
  categoryName?: string;
  categorySlug?: string;
  name: string;
  slug: string;
  skuBase: string;
  shortDescription: string;
  description: string;
  fabric: string | null;
  pattern: string | null;
  style: string | null;
  careInstructions: string | null;
  basePrice: number;
  salePrice: number | null;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  primary_image_url?: string;
  secondary_image_url?: string;
  images_360?: string[];
  is_360?: boolean;
  views?: {
    front?: string;
    back?: string;
    side?: string;
    detail?: string;
    [key: string]: string | undefined;
  };
  total_stock?: number;
  averageRating?: number;
  average_rating?: number;
  reviewCount?: number;
  review_count?: number;
  images?: ProductImage[];
  variants?: ProductVariant[];
  relatedProducts?: Product[];
}

export type ProductItem = Product;

export interface Category {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  image_url?: string | null;
  displayOrder: number;
  display_order?: number;
  seoTitle: string | null;
  seoDescription: string | null;
  productCount?: number;
  product_count?: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  variantId: number;
  productId: number;
  productName: string;
  productSlug: string;
  variantSku: string;
  quantity: number;
  unitPrice: number;
  compareAtPrice: number | null;
  subtotal: number;
  imageUrl: string;
  stockAvailable: number;
  isAvailable: boolean;
  attributes: Record<string, string>;
}

export interface CartSummary {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  discount: number;
  shippingCharge: number;
  codCharge: number;
  tax: number;
  grandTotal: number;
  appliedCoupon: string | null;
}

export interface CustomerUser {
  id: number;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
