import { LuxuryLoader } from '../components/ui/LuxuryLoader';

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-cream/60">
      <LuxuryLoader
        title="Loading Boutique Experience"
        subtitle="Huma Collection • Pure Saudi Nida & Korean Crepe"
      />
    </div>
  );
}
