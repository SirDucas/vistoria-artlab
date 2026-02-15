import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black">Prodotti</h2>
          <p className="text-gray-500">Gestisci l'inventario delle tue opere.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Nuova Opera
        </Link>
      </div>

      <div className="rounded-soft-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">Galleria</th>
                <th className="px-6 py-4">Titolo</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Prezzo</th>
                <th className="px-6 py-4">Stato</th>
                <th className="px-6 py-4 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50/50 transition">
                  <td className="px-6 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border">
                      <Image
                        src={product.images[0]?.url || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=200&h=200&auto=format&fit=crop'}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold">{product.title}</span>
                      <span className="text-[10px] text-gray-400 font-mono">#{product.id.slice(-8)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase text-gray-600">
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black">{formatPrice(product.priceCents, product.currency)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wider ${product.availability === 'IN_STOCK' ? 'text-mint bg-mint/10' : product.availability === 'MADE_TO_ORDER' ? 'text-secondary bg-secondary/10' : 'text-coral bg-coral/10'}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${product.availability === 'IN_STOCK' ? 'bg-mint' : product.availability === 'MADE_TO_ORDER' ? 'bg-secondary' : 'bg-coral'}`} />
                      {product.availability.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/product/${product.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-primary transition" title="Vedi sul sito">
                        <ExternalLink size={18} />
                      </Link>
                      <Link href={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-secondary transition" title="Modifica">
                        <Edit size={18} />
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-coral transition" title="Elimina">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-400 font-medium">Nessun prodotto in galleria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
