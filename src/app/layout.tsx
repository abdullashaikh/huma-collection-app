import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { CartDrawer } from '../components/cart/CartDrawer';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { Footer } from '../components/layout/Footer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { Navbar } from '../components/layout/Navbar';
import { CartProvider } from '../lib/cart-context';
import './globals.css';

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

  title: 'Huma Hijab Collection | Luxury Burqas & Modest Fashion Online',
  description:
    'Discover premium Burqas, Abayas, Hijabs, Niqabs, Non-Alcoholic Attars, Janamaz, and Hajj & Umrah essentials. Tailored with authentic Korean Crepe and Saudi Nida Matte fabrics.',
  keywords: [
    'Burqa',
    'Burqa Collection',
    'Dubai Burqa',
    'Korean Crepe Burqa',
    'Abaya',
    'Hijab',
    'Niqab',
    'Attar',
    'Janamaz',
    'Huma Hijab Collection',
    'Modest Fashion India',
  ],
  metadataBase: new URL('https://humahijabcollection.com'),
  alternates: {
    canonical: 'https://humahijabcollection.com',
  },
  openGraph: {
    title: 'Huma Hijab Collection | Luxury Modest Fashion',
    description: 'Breathtaking Burqas, Abayas and Islamic essentials crafted with exquisite modesty.',
    url: 'https://humahijabcollection.com',
    siteName: 'Huma Hijab Collection',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Huma Hijab Collection Royal Burqa Showcase',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Huma Hijab Collection',
    url: 'https://humahijabcollection.com',
    logo: 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=400&q=80',
    founder: {
      '@type': 'Person',
      name: 'Hamid Shaikh',
    },
    hasMap: 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+918200617009',
      contactType: 'Customer Service & Boutique Inquiries',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Urdu', 'Gujarati'],
    },
    sameAs: ['https://instagram.com/humahijabcollection'],
  };

  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-cream text-brand-obsidian font-sans antialiased selection:bg-brand-gold/30 selection:text-brand-obsidian">
        {/* Razorpay Checkout Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileBottomNav />
        </CartProvider>
      </body>

    </html>
  );
}
