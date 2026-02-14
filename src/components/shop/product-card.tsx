'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/cart-store';

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  return (
    <article className="group overflow-hidden rounded-soft bg-white shadow-soft transition hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <Image src={product.images[0]?.url} alt={product.title} width={400} height={300} className="h-56 w-full object-cover" />
      </Link>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-primary">{product.type}</p>
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">{formatPrice(product.priceCents, product.currency)}</span>
          <button
            disabled={product.availability === 'SOLD_OUT'}
            className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-white disabled:bg-gray-300"
            onClick={() => addItem({
              productId: product.id,
              slug: product.slug,
              title: product.title,
              image: product.images[0]?.url,
              priceCents: product.priceCents
            })}
          >
            {product.availability === 'SOLD_OUT' ? 'Sold out' : 'Aggiungi'}
          </button>
        </div>
      </div>
    </article>
  );
}
