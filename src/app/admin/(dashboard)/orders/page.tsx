'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchOrders = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders${query ? `?orderId=${query}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(search);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white">Gestione Ordini</h1>
        <div className="flex gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cerca per ID o Numero Ordine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-white outline-none focus:border-primary transition"
            />
          </form>
        </div>
      </div>

      <div className="rounded-soft-xl border border-white/10 bg-white/5 shadow-glass overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4 border-b border-white/10">ID Ordine</th>
                <th className="px-6 py-4 border-b border-white/10">Cliente</th>
                <th className="px-6 py-4 border-b border-white/10">Stato</th>
                <th className="px-6 py-4 border-b border-white/10">Totale</th>
                <th className="px-6 py-4 border-b border-white/10">Data</th>
                <th className="px-6 py-4 border-b border-white/10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin text-primary mx-auto" size={32} />
                  </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition group cursor-pointer" onClick={() => window.location.href = `/admin/orders/${order.id}`}>
                  <td className="px-6 py-4 font-mono text-gray-500">#{order.id.slice(-8)}</td>
                  <td className="px-6 py-4 font-bold text-gray-200">
                    <div>
                      <p>{order.customerName || 'Nessun nome'}</p>
                      <p className="text-xs text-gray-500 font-normal">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wider ${order.status === 'PAID' ? 'bg-mint/10 text-mint' : 'bg-sun/10 text-sun'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-white">€ {(order.totalCents / 100).toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-400 group-hover:bg-primary group-hover:text-white transition">
                      <ArrowRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500 font-medium italic">Nessun ordine trovato.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
