/**
 * Resolves media URLs:
 * 1. Rewrites direct Amazon S3 URLs (which return 403 Forbidden on private buckets) to the backend streaming proxy.
 * 2. Replaces 'localhost:5000' / '127.0.0.1:5000' with the configured NEXT_PUBLIC_API_URL so HTTPS storefront loads seamlessly.
 * 3. Handles relative '/api/v1/media/file/...' paths.
 */
export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'https://api.humacollection.in/api/v1').replace(/\/+$/, '');

  // If it's already a media proxy URL with localhost or any host
  if (url.includes('/api/v1/media/file/')) {
    const parts = url.split('/api/v1/media/file/');
    if (parts.length > 1) {
      return `${apiBase}/media/file/${parts[1]}`;
    }
  }

  // If it's an Amazon S3 URL (private bucket returns 403, must route through streaming proxy)
  if (url.includes('amazonaws.com')) {
    // Strip protocol + domain
    let cleanKey = url.replace(/https?:\/\/[^\/]+\//, '');
    // Strip bucket name if in path-style URL
    cleanKey = cleanKey.replace(/^(huma-collection-products-2026\/)/, '');
    // Strip query parameters if any (like ?mock_presigned=true)
    cleanKey = cleanKey.split('?')[0];
    return `${apiBase}/media/file/${cleanKey}`;
  }

  // If it has localhost:5000 or 127.0.0.1:5000 anywhere, rewrite to apiBase
  if (url.includes('localhost:5000') || url.includes('127.0.0.1:5000')) {
    const cleanPath = url.replace(/^https?:\/\/(localhost|127\.0\.0\.1):5000\/?(api\/v1)?\/?/, '');
    return `${apiBase}/${cleanPath.replace(/^\/+/, '')}`;
  }

  return url;
}
