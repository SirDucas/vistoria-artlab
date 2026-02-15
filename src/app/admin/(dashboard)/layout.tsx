import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Package } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl shadow-glass">
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-black text-primary">Admin <span className="text-secondary">Lab</span></Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white font-medium transition">
            <Package size={20} /> Prodotti
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white font-medium transition">
            <ShoppingBag size={20} /> Ordini
          </Link>
          <div className="pt-8 mt-8 border-t border-white/10">
            <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white font-medium transition">
              <Settings size={20} /> Impostazioni
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-white">Bentornato, {session.user.name}</h1>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">Vedi Sito →</Link>
            <form action={async () => {
              'use server';
              await signOut();
            }}>
              <button className="flex items-center gap-2 rounded-full border border-red-500/20 px-4 py-2 text-sm font-bold hover:bg-red-500/10 text-coral bg-red-500/5 transition-all">
                <LogOut size={16} /> Logout
              </button>
            </form>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
