import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/product-card';

export default async function HomePage() {
  const featured = await prisma.product.findMany({ include: { images: true }, take: 4, orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-12">
      <section className="rounded-soft bg-gradient-to-r from-mint via-sky to-coral p-10 text-white shadow-soft">
        <h1 className="text-4xl font-extrabold">Art gallery meets playful colorful studio</h1>
        <p className="mt-4 max-w-2xl text-lg">Piccole opere originali e oggetti d’autore per colorare i tuoi spazi.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-primary">Scopri la collezione</Link>
      </section>
      <section>
        <h2 className="mb-6 text-2xl font-bold">Novità in galleria</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
