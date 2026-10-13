import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '../lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Huma Collection | Hijabs, Abayas, Burqas & Islamic Essentials',
    short_name: 'Huma Collection',
    description:
      'Modest fashion store selling hijabs, abayas, burqas, niqabs, perfumes, attar and Islamic essentials in India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFBF9',
    theme_color: '#1C1B1A',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
