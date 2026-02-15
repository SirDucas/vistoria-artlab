'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Sei sicuro di voler eliminare "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Errore durante l'eliminazione.");
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">Prodotti</h2>
          <p className="text-gray-500 font-medium">Gestisci l'inventario delle tue opere.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2 px-6 py-3">
          <Plus size={20} /> Nuova Opera
        </Link>
      </div>

      <div className="rounded-soft-xl border border-white/10 bg-white/5 shadow-glass overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4 border-b border-white/10">Galleria</th>
                <th className="px-6 py-4 border-b border-white/10">Titolo</th>
                <th className="px-6 py-4 border-b border-white/10">Tipo</th>
                <th className="px-6 py-4 border-b border-white/10">Prezzo</th>
                <th className="px-6 py-4 border-b border-white/10">Stato</th>
                <th className="px-6 py-4 border-b border-white/10 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin text-primary mx-auto" size={32} />
                  </td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="group hover:bg-white/5 transition">
                  <td className="px-6 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/10">
                      <Image
                        src={product.images[0]?.url || '/placeholder.png'}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-200">
                    <div className="flex flex-col">
                      <span>{product.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">#{product.id.slice(-8)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1 text-[10px] font-bold uppercase text-gray-400">
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-white">{formatPrice(product.priceCents, product.currency)}</td>
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
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        className="p-2 text-gray-400 hover:text-coral transition"
                        title="Elimina"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500 font-medium italic">Nessun prodotto in galleria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
