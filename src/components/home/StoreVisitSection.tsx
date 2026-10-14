import React from 'react';
import { GoogleMapSection } from './GoogleMapSection';

interface StoreVisitSectionProps {
  id?: string;
  className?: string;
}

export const StoreVisitSection: React.FC<StoreVisitSectionProps> = (props) => {
  return <GoogleMapSection {...props} />;
};
