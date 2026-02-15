import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { AddToCartButton } from '@/components/shop/add-to-cart-button';
import { ProductCard } from '@/components/shop/product-card';
import { Ruler, Sparkles, Box, Info } from 'lucide-react';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      slug: params.slug,
      isDeleted: false
    },
    include: { images: true }
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      isDeleted: false
    },
    include: { images: true },
    take: 4
  });

  return (
    <div className="space-y-24 pb-20">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-soft-xl shadow-soft">
            <Image
              src={product.images[0]?.url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&h=800&auto=format&fit=crop'}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((img) => (
              <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl border-2 border-transparent hover:border-primary">
                <Image src={img.url} alt={img.alt || product.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary">
              {product.type}
            </div>
            <h1 className="text-5xl font-black tracking-tight">{product.title}</h1>
            <p className="text-3xl font-black text-primary">{formatPrice(product.priceCents, product.currency)}</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-gray-600">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Ruler size={20} className="mt-1 text-primary" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Dimensioni</p>
                <p className="font-semibold">{product.widthCm} x {product.heightCm} {product.depthCm ? `x ${product.depthCm}` : ''} cm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles size={20} className="mt-1 text-primary" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Materiali</p>
                <p className="font-semibold">{product.materials.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Box size={20} className="mt-1 text-primary" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Peso</p>
                <p className="font-semibold">{product.weightGrams ? `${product.weightGrams}g` : 'Leggero'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info size={20} className="mt-1 text-primary" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">SKU</p>
                <p className="font-semibold font-mono text-sm">{product.sku}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-8">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${product.availability === 'SOLD_OUT' ? 'text-coral' : 'text-mint'}`}>
                {product.availability === 'SOLD_OUT' ? 'Esaurito' : product.availability === 'MADE_TO_ORDER' ? 'Realizzato su ordinazione' : 'Disponibile subito'}
              </span>
              {product.quantity > 0 && <span className="text-xs text-gray-400">Qta: {product.quantity}</span>}
            </div>
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                title: product.title,
                image: product.images[0]?.url,
                priceCents: product.priceCents,
                availability: product.availability
              }}
            />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="space-y-12 border-t pt-24">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight">Potrebbe piacerti anche...</h2>
            <p className="mt-2 text-gray-500">Altre opere dalla stessa categoria.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
