'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/cart-store';
import { ShoppingBag } from 'lucide-react';

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <article className="card-art group flex flex-col h-full">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-t-soft">
        <Image
          src={product.images[0]?.url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&h=800&auto=format&fit=crop'}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur-md border border-white/10">
            {product.type}
          </span>
        </div>
        {product.availability === 'SOLD_OUT' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-black">
              Sold out
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            <Link href={`/product/${product.slug}`}>{product.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-gray-400 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-xl font-black text-secondary">{formatPrice(product.priceCents, product.currency)}</span>
          <button
            disabled={product.availability === 'SOLD_OUT'}
            className="flex items-center gap-2 rounded-full bg-primary p-3 font-bold text-white transition hover:bg-primary/80 hover:scale-110 active:scale-95 disabled:bg-white/10 disabled:scale-100 disabled:text-gray-600 shadow-soft"
            onClick={() => addItem({
              productId: product.id,
              slug: product.slug,
              title: product.title,
              image: product.images[0]?.url,
              priceCents: product.priceCents
            })}
            aria-label={`Aggiungi ${product.title} al carrello`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
