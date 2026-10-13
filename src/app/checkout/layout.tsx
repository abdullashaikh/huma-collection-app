import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Secure Checkout | Huma Collection',
  },
  description: 'Complete your modest order securely.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
