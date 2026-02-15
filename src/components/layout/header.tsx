'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/cart-store';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export function Header() {
  const { items, removeItem, setQuantity, total } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="glass sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tighter text-primary">
          Vistoria <span className="text-secondary">ArtLab</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/shop" className="font-medium hover:text-primary transition-colors">Shop</Link>
          <Link href="/about" className="font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="font-medium hover:text-primary transition-colors">Contact</Link>

          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">
              <ShoppingBag size={18} />
              <span>{items.reduce((acc, i) => acc + i.quantity, 0)}</span>
            </summary>
            <div className="absolute right-0 mt-3 w-80 translate-y-2 rounded-soft-xl bg-slate-900/95 border border-white/10 p-6 opacity-0 shadow-soft-xl backdrop-blur-xl transition-all group-open:translate-y-0 group-open:opacity-100">
              <h3 className="mb-4 text-lg font-bold">Il tuo carrello</h3>
              {items.length === 0 ? (
                <p className="py-4 text-center text-gray-400">Il carrello è vuoto.</p>
              ) : (
                <div className="max-h-60 overflow-auto pr-2">
                  {items.map((item) => (
                    <div key={item.productId} className="mb-4 flex items-center gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-secondary font-bold">{formatPrice(item.priceCents)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
                          className="w-10 rounded-md border border-white/10 bg-white/5 text-center text-sm outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button onClick={() => removeItem(item.productId)} className="text-coral hover:text-red-400 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Totale:</span>
                  <span className="text-sun">{formatPrice(total)}</span>
                </div>
                {items.length > 0 && (
                  <button onClick={checkout} className="btn-primary mt-4 w-full">
                    Vai al Checkout
                  </button>
                )}
              </div>
            </div>
          </details>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="glass absolute inset-x-0 top-full flex flex-col gap-4 p-6 md:hidden">
          <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">Shop</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">About</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">Contact</Link>
        </div>
      )}
    </header>
  );
}
