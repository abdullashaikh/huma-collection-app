import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Huma Hijab Collection | Luxury Burqas & Modest Fashion',
    short_name: 'Huma Hijab',
    description:
      'Luxury modest fashion boutique specializing in Saudi Nida burqas, butterfly abayas, premium hijabs, non-alcoholic attars, and pilgrimage essentials.',
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
