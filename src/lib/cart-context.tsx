'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartSummary } from '../types';
import { fetchApi, getSessionId } from './api';

interface CartContextType {
  cart: CartSummary | null;
  itemCount: number;
  isLoading: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (variantId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const refreshCart = async () => {
    try {
      const sessionId = getSessionId();
      const res = await fetchApi<CartSummary>(`/cart?sessionId=${sessionId}`);
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      console.error('Failed to refresh cart:', err);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as any).requestIdleCallback(() => refreshCart(), { timeout: 2500 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(refreshCart, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const addToCart = async (variantId: number, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      const res = await fetchApi<CartSummary>('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ sessionId, variantId, quantity }),
      });
      if (res.success && res.data) {
        setCart(res.data);
        setIsDrawerOpen(true);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to add item to bag');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      const res = await fetchApi<CartSummary>(`/cart/items/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ sessionId, quantity }),
      });
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (cartItemId: number) => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      const res = await fetchApi<CartSummary>(`/cart/items/${cartItemId}?sessionId=${sessionId}`, {
        method: 'DELETE',
      });
      if (res.success && res.data) {
        setCart(res.data);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        isLoading,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addToCart,
        updateQuantity,
        removeItem,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
