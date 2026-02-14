'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-store';
import { formatPrice } from '@/lib/utils';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/api/products/${params.slug}`).then((r) => r.json()).then(setProduct);
  }, [params.slug]);

  if (!product) return <p>Caricamento...</p>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Image src={product.images[0]?.url} alt={product.title} width={800} height={700} className="w-full rounded-soft object-cover" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p>{product.description}</p>
        <p className="text-2xl font-semibold">{formatPrice(product.priceCents)}</p>
        <p className="text-sm">Materiali: {product.materials.join(', ')}</p>
        <p className="text-sm">Dimensioni: {product.widthCm} x {product.heightCm} x {product.depthCm} cm</p>
        <button
          onClick={() => addItem({ productId: product.id, slug: product.slug, title: product.title, image: product.images[0]?.url, priceCents: product.priceCents })}
          className="rounded-full bg-accent px-5 py-3 font-semibold text-white"
        >
          Aggiungi al carrello
        </button>
      </div>
    </div>
  );
}
