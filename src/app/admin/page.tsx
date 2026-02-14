import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

export default async function AdminDashboard() {
  const [ordersCount, paidOrders, latestOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalCents: true }, where: { status: 'PAID' } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  ]);
  return <div className="space-y-5"><h1 className="text-3xl font-bold">Dashboard</h1><div className="grid gap-4 md:grid-cols-2"><div className="rounded-soft bg-white p-4 shadow-soft">Ordini totali: {ordersCount}</div><div className="rounded-soft bg-white p-4 shadow-soft">Entrate: {formatPrice(paidOrders._sum.totalCents || 0)}</div></div><div className="rounded-soft bg-white p-4 shadow-soft"><h2 className="mb-3 font-semibold">Ultimi ordini</h2>{latestOrders.map((o) => <p key={o.id}>{o.orderNumber} · {o.status} · {formatPrice(o.totalCents)}</p>)}</div></div>;
}
