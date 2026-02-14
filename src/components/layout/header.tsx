'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-store';
import { formatPrice } from '@/lib/utils';

export function Header() {
  const { items, removeItem, setQuantity, total } = useCart();

  async function checkout() {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    const data = await response.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <header className="sticky top-0 z-20 border-b border-primary/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-primary">Vistoria ArtLab</Link>
        <div className="flex items-center gap-6">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <details className="relative">
            <summary className="flex cursor-pointer items-center gap-2 rounded-full bg-sky px-3 py-2 text-sm font-semibold text-text">
              <ShoppingBag size={16} /> {items.length}
            </summary>
            <div className="absolute right-0 mt-2 w-80 rounded-soft bg-white p-4 shadow-soft">
              <p className="mb-3 font-semibold">Carrello</p>
              {items.length === 0 ? <p className="text-sm text-gray-500">Nessun prodotto.</p> : null}
              {items.map((item) => (
                <div key={item.productId} className="mb-3 flex items-center justify-between gap-2 text-sm">
                  <div>
                    <p>{item.title}</p>
                    <p className="text-gray-500">{formatPrice(item.priceCents)}</p>
                  </div>
                  <input aria-label={`Quantità ${item.title}`} type="number" min={1} value={item.quantity} onChange={(e) => setQuantity(item.productId, Number(e.target.value))} className="w-14 rounded border p-1" />
                  <button onClick={() => removeItem(item.productId)} className="text-coral">X</button>
                </div>
              ))}
              <p className="font-semibold">Totale: {formatPrice(total)}</p>
              {items.length > 0 ? <button onClick={checkout} className="mt-2 w-full rounded-full bg-primary px-4 py-2 text-center text-white">Checkout</button> : null}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
