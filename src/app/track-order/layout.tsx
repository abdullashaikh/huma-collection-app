import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Track Your Order | Huma Collection',
  },
  description: 'Track the delivery and fulfillment status of your modest wear order in real time.',
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
