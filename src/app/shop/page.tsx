import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/product-card';

const PAGE_SIZE = 8;

export default async function ShopPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const category = String(searchParams.category || '');
  const availability = String(searchParams.availability || '');
  const q = String(searchParams.q || '');
  const tag = String(searchParams.tag || '');
  const sort = String(searchParams.sort || 'new');
  const page = Number(searchParams.page || 1);
  const min = Number(searchParams.min || 0);
  const max = Number(searchParams.max || 999999);

  const where = {
    ...(category ? { category } : {}),
    ...(availability ? { availability: availability as any } : {}),
    ...(tag ? { tags: { has: tag } } : {}),
    ...(q ? { OR: [{ title: { contains: q, mode: 'insensitive' as const } }, { description: { contains: q, mode: 'insensitive' as const } }] } : {}),
    priceCents: { gte: min * 100, lte: max * 100 }
  };

  const orderBy = sort === 'price_asc' ? { priceCents: 'asc' as const } : sort === 'price_desc' ? { priceCents: 'desc' as const } : { createdAt: 'desc' as const };

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, include: { images: true }, orderBy, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    prisma.product.count({ where })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shop</h1>
      <form className="grid gap-3 rounded-soft bg-white p-4 shadow-soft md:grid-cols-6">
        <input name="q" placeholder="Cerca" defaultValue={q} className="rounded border p-2" />
        <input name="category" placeholder="Categoria" defaultValue={category} className="rounded border p-2" />
        <input name="tag" placeholder="Tag" defaultValue={tag} className="rounded border p-2" />
        <input name="min" type="number" placeholder="Prezzo min" defaultValue={min || ''} className="rounded border p-2" />
        <input name="max" type="number" placeholder="Prezzo max" defaultValue={max === 999999 ? '' : max} className="rounded border p-2" />
        <select name="sort" defaultValue={sort} className="rounded border p-2">
          <option value="new">Novità</option>
          <option value="price_asc">Prezzo crescente</option>
          <option value="price_desc">Prezzo decrescente</option>
        </select>
        <select name="availability" defaultValue={availability} className="rounded border p-2">
          <option value="">Disponibilità</option>
          <option value="IN_STOCK">In stock</option>
          <option value="MADE_TO_ORDER">Made to order</option>
          <option value="SOLD_OUT">Sold out</option>
        </select>
        <button className="rounded bg-primary px-4 py-2 font-semibold text-white">Filtra</button>
      </form>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{total} prodotti</p>
        <div className="flex gap-2">
          {page > 1 ? <a href={`?page=${page - 1}`} className="rounded border px-3 py-1">Prev</a> : null}
          {page * PAGE_SIZE < total ? <a href={`?page=${page + 1}`} className="rounded border px-3 py-1">Next</a> : null}
        </div>
      </div>
    </div>
  );
}
