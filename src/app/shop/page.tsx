import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/product-card';
import { Search, SlidersHorizontal } from 'lucide-react';

const PAGE_SIZE = 12;

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

  const categories = await prisma.product.findMany({ select: { category: true }, distinct: ['category'] });

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Galleria</h1>
        <p className="text-lg text-gray-500">Esplora la nostra collezione accuratamente selezionata.</p>
      </header>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="w-full shrink-0 space-y-8 lg:w-64">
          <form className="glass rounded-soft-xl p-8 space-y-8">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs text-secondary">
                <Search size={14} /> Cerca
              </h3>
              <input
                name="q"
                placeholder="Cerca un'opera..."
                defaultValue={q}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs text-secondary">
                <SlidersHorizontal size={14} /> Filtri
              </h3>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Categoria</p>
                <select name="category" defaultValue={category} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition">
                  <option value="" className="bg-black">Tutte</option>
                  {categories.map((c) => (
                    <option key={c.category} value={c.category} className="bg-black">{c.category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Prezzo (EUR)</p>
                <div className="flex gap-2">
                  <input name="min" type="number" placeholder="Min" defaultValue={min || ''} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm focus:border-primary outline-none transition" />
                  <input name="max" type="number" placeholder="Max" defaultValue={max === 999999 ? '' : max} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm focus:border-primary outline-none transition" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Ordina per</p>
                <select name="sort" defaultValue={sort} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition">
                  <option value="new" className="bg-black">Novità</option>
                  <option value="price_asc" className="bg-black">Prezzo crescente</option>
                  <option value="price_desc" className="bg-black">Prezzo decrescente</option>
                </select>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Disponibilità</p>
                <select name="availability" defaultValue={availability} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none transition">
                  <option value="" className="bg-black">Tutte</option>
                  <option value="IN_STOCK" className="bg-black">In stock</option>
                  <option value="MADE_TO_ORDER" className="bg-black">Made to order</option>
                  <option value="SOLD_OUT" className="bg-black">Sold out</option>
                </select>
              </div>
            </div>

            <button className="btn-primary w-full">Applica Filtri</button>
            {Object.keys(searchParams).length > 0 && (
              <a href="/shop" className="block text-center text-sm font-bold text-gray-500 hover:text-coral transition-colors">
                Resetta tutto
              </a>
            )}
          </form>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 space-y-12">
          {products.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-white/10 pt-8">
                <p className="text-sm font-medium text-gray-500">Mostrando {products.length} di {total} opere</p>
                <div className="flex gap-2">
                  {page > 1 ? (
                    <a href={`?page=${page - 1}`} className="rounded-full border border-white/10 px-6 py-2 font-bold transition hover:bg-white/5">
                      Indietro
                    </a>
                  ) : null}
                  {page * PAGE_SIZE < total ? (
                    <a href={`?page=${page + 1}`} className="btn-secondary px-6 py-2">
                      Avanti
                    </a>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-96 flex-col items-center justify-center rounded-soft-xl bg-white/5 border border-white/5 p-12 text-center">
              <Search className="mb-4 text-white/10" size={48} />
              <h3 className="text-2xl font-bold">Nessun risultato</h3>
              <p className="mt-2 text-gray-500">Prova a cambiare i filtri o la ricerca.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
