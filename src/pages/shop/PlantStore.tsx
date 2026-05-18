import React from 'react';
import PlantStore from '@/components/plant/PlantStore';
import { CartProvider } from '@/contexts/CartContext';

const PlantStorePage: React.FC = () => {
  return (
    <CartProvider>
      <PlantStore />
    </CartProvider>
  );
};

export default PlantStorePage;