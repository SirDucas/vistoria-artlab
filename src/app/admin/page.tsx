import { prisma } from '@/lib/prisma';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';

export default async function AdminDashboardPage() {
  const [productsCount, ordersCount, totalSales] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalCents: true } })
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, totalCents: true, status: true, userEmail: true, createdAt: true }
  });

  const stats = [
    { label: 'Fatturato Totale', value: `€ ${((totalSales._sum.totalCents || 0) / 100).toFixed(2)}`, icon: DollarSign, color: 'text-mint bg-mint/10' },
    { label: 'Ordini Ricevuti', value: ordersCount, icon: ShoppingBag, color: 'text-primary bg-primary/10' },
    { label: 'Opere in Galleria', value: productsCount, icon: Package, color: 'text-secondary bg-secondary/10' },
    { label: 'Tasso Conversione', value: '3.2%', icon: TrendingUp, color: 'text-sun bg-sun/10' }
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-soft-xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl font-black">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-soft-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Ultimi Ordini</h2>
          <Link href="/admin/orders" className="text-sm font-bold text-primary hover:underline">Vedi Tutti</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-400">
              <tr>
                <th className="px-6 py-4">ID Ordine</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Stato</th>
                <th className="px-6 py-4">Totale</th>
                <th className="px-6 py-4">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 font-mono text-gray-400">#{order.id.slice(-8)}</td>
                  <td className="px-6 py-4 font-bold">{order.userEmail}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wider ${order.status === 'PAID' ? 'bg-mint/10 text-mint' : 'bg-sun/10 text-sun'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black">€ {(order.totalCents / 100).toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 font-medium">Nessun ordine presente.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';
