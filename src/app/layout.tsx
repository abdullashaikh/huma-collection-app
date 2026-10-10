import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { CartDrawer } from '../components/cart/CartDrawer';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { Footer } from '../components/layout/Footer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { Navbar } from '../components/layout/Navbar';
import { CartProvider } from '../lib/cart-context';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#1C1B1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Huma Hijab Collection | Luxury Burqas & Modest Fashion Online',
    template: '%s | Huma Hijab Collection',
  },
  description:
    'Discover signature luxury Burqas, Dubai Abayas, Breathable Hijabs, Saudi Niqabs, Artisanal Non-Alcoholic Attars, and Hajj & Umrah pilgrimage essentials. Hand-tailored with authentic Korean Crepe and Saudi Nida Matte fabrics.',
  keywords: [
    'Burqa',
    'Burqa Collection',
    'Luxury Burqa Online',
    'Dubai Abaya',
    'Korean Crepe Burqa',
    'Saudi Nida Abaya',
    'Premium Hijab Online',
    'Niqab Saudi Style',
    'Non-Alcoholic Attar',
    'Plush Janamaz',
    'Hajj and Umrah Essentials',
    'Huma Hijab Collection',
    'Modest Fashion India',
    'Modest Fashion Ahmedabad',
    'Burqa Store Ahmedabad',
    'Buy Burqa Online India',
  ],
  authors: [{ name: 'Hamid Shaikh', url: 'https://humahijabcollection.com' }],
  creator: 'Huma Hijab Collection',
  publisher: 'Huma Hijab Collection',
  metadataBase: new URL('https://humahijabcollection.com'),
  alternates: {
    canonical: 'https://humahijabcollection.com',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/icon.svg' },
    ],
    shortcut: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Huma Hijab Collection | Luxury Burqas & Modest Fashion',
    description: 'Breathtaking Burqas, Abayas and Islamic essentials crafted with exquisite modesty and imported luxury fabrics.',
    url: 'https://humahijabcollection.com',
    siteName: 'Huma Hijab Collection',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Huma Hijab Collection — Royal Burqa & Modest Fashion Showcase',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huma Hijab Collection | Luxury Modest Wear',
    description: 'Explore our signature Dubai crepe front open and butterfly flare burqas.',
    images: ['https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85'],
  },
  category: 'clothing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ClothingStore',
        '@id': 'https://humahijabcollection.com/#store',
        name: 'Huma Hijab Collection',
        alternateName: ['Huma Burqa & Modest Fashion Boutique', 'Huma Hijab Store'],
        url: 'https://humahijabcollection.com',
        logo: 'https://humahijabcollection.com/icon.svg',
        image: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
        description:
          'Premier boutique for luxury modest fashion, designer burqas, Saudi nida abayas, imported Turkish hijabs, and non-alcoholic attars.',
        telephone: '+918200617009',
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Relief Road, Near Teen Darwaza',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          postalCode: '380001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '23.0225',
          longitude: '72.5714',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '10:30',
            closes: '21:30',
          },
        ],
        hasMap: 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6',
        founder: {
          '@type': 'Person',
          name: 'Hamid Shaikh',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+918200617009',
          contactType: 'Customer Service & Boutique Inquiries',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Urdu', 'Gujarati'],
        },
        sameAs: ['https://instagram.com/humahijabcollection'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://humahijabcollection.com/#website',
        url: 'https://humahijabcollection.com',
        name: 'Huma Hijab Collection',
        description: 'Luxury Burqas & Modest Fashion Online',
        publisher: {
          '@id': 'https://humahijabcollection.com/#store',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://humahijabcollection.com/collection?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#1C1B1A" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Ahmedabad" />
        <meta name="geo.position" content="23.0225;72.5714" />
        <meta name="ICBM" content="23.0225, 72.5714" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-obsidian font-sans antialiased selection:bg-brand-gold/30 selection:text-brand-obsidian">
        {/* Razorpay Checkout Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1 pb-20 lg:pb-0">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileBottomNav />
        </CartProvider>
      </body>

    </html>
  );
}
