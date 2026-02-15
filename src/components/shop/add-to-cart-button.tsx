'use client';

import { useCart } from '@/context/cart-store';
import { ShoppingBag } from 'lucide-react';

export function AddToCartButton({ product }: { product: any }) {
    const { addItem } = useCart();

    const isSoldOut = product.availability === 'SOLD_OUT';

    return (
        <button
            disabled={isSoldOut}
            onClick={() => addItem({
                productId: product.id,
                slug: product.slug,
                title: product.title,
                image: product.image,
                priceCents: product.priceCents
            })}
            className="btn-primary w-full flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:scale-100 disabled:text-gray-400"
        >
            <ShoppingBag size={20} />
            {isSoldOut ? 'Prodotto Esaurito' : 'Aggiungi al Carrello'}
        </button>
    );
}
