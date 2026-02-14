import Link from 'next/link';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect('/admin/login');
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="rounded-soft bg-white p-4 shadow-soft"><h2 className="mb-3 font-bold">Admin</h2><nav className="space-y-2 text-sm"><Link className="block" href="/admin">Dashboard</Link><Link className="block" href="/admin/products">Prodotti</Link><Link className="block" href="/admin/orders">Ordini</Link><Link className="block" href="/admin/content">Contenuti</Link></nav></aside>
      <section>{children}</section>
    </div>
  );
}
