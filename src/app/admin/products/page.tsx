import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Prodotti</h1><Link className="rounded bg-primary px-3 py-2 text-white" href="/admin/products/new">Nuovo prodotto</Link></div>
      <div className="rounded-soft bg-white p-4 shadow-soft">{products.map((p) => <p key={p.id}>{p.title} · {p.availability} · {formatPrice(p.priceCents)}</p>)}</div>
    </div>
  );
}
