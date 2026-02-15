'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, Settings } from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/products', label: 'Prodotti', icon: Package },
    { href: '/admin/orders', label: 'Ordini', icon: ShoppingBag },
    { href: '/admin/settings', label: 'Impostazioni', icon: Settings, topBorder: true },
];

export function SidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="p-4 space-y-2">
            {navItems.map((item) => {
                const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href) && item.href !== '/admin';

                // Special case for Dashboard precisely
                const isDashboardActive = item.href === '/admin' && pathname === '/admin';
                const finalActive = item.href === '/admin' ? isDashboardActive : isActive;

                return (
                    <div key={item.href}>
                        {item.topBorder && <div className="pt-8 mt-8 border-t border-white/10" />}
                        <Link
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${finalActive
                                    ? 'bg-primary/10 text-primary font-bold shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white font-medium'
                                }`}
                        >
                            <item.icon size={20} className={finalActive ? 'text-primary' : ''} />
                            {item.label}
                        </Link>
                    </div>
                );
            })}
        </nav>
    );
}
