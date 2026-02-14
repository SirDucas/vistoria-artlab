'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type CartItem = {
  productId: string;
  slug: string;
  title: string;
  priceCents: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo(
    () => ({
      items,
      addItem: (item: Omit<CartItem, 'quantity'>) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === item.productId);
          if (existing) return prev.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i));
          return [...prev, { ...item, quantity: 1 }];
        }),
      removeItem: (productId: string) => setItems((prev) => prev.filter((p) => p.productId !== productId)),
      setQuantity: (productId: string, qty: number) =>
        setItems((prev) => prev.map((p) => (p.productId === productId ? { ...p, quantity: Math.max(1, qty) } : p))),
      total: items.reduce((acc, item) => acc + item.priceCents * item.quantity, 0)
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve essere usato dentro CartProvider');
  return ctx;
}
