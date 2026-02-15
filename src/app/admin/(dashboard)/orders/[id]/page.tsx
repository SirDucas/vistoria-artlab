import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, User, MapPin, Calendar, CreditCard, Tag } from 'lucide-react';

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const order = await prisma.order.findUnique({
        where: { id: params.id },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) notFound();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-white">Ordine #{order.id.slice(-8)}</h1>
                    <p className="text-gray-500 font-medium">Gestione e dettagli dell'ordine</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="rounded-soft-xl border border-white/10 bg-white/5 shadow-glass overflow-hidden p-8 space-y-8 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-white flex items-center gap-3">
                            <Package className="text-primary" size={24} /> Prodotti Ordinati
                        </h2>
                        <div className="divide-y divide-white/10">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 flex items-center gap-4 first:pt-0 last:pb-0">
                                    <div className="h-16 w-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                                        {item.imageSnapshot && (
                                            <img src={item.imageSnapshot} alt={item.titleSnapshot} className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white">{item.titleSnapshot}</h4>
                                        <p className="text-sm text-gray-500">SKU: {item.skuSnapshot}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-white">€ {(item.priceCents / 100).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Quantità: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Totale Ordine</p>
                                <p className="text-3xl font-black text-white">€ {(order.totalCents / 100).toFixed(2)}</p>
                            </div>
                            <div className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest ${order.status === 'PAID' ? 'bg-mint/10 text-mint' : 'bg-sun/10 text-sun'}`}>
                                Stato: {order.status}
                            </div>
                        </div>
                    </div>

                    {order.note && (
                        <div className="rounded-soft-xl border border-white/10 bg-sun/5 p-8 space-y-4">
                            <h3 className="font-bold text-sun flex items-center gap-2">
                                <Tag size={18} /> Nota del Cliente
                            </h3>
                            <p className="text-gray-300 italic">"{order.note}"</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Customer Info */}
                    <div className="rounded-soft-xl border border-white/10 bg-white/5 shadow-glass p-8 space-y-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white flex items-center gap-3">
                            <User className="text-secondary" size={20} /> Cliente
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-gray-500 uppercase tracking-widest text-[10px] font-black">Nome</p>
                                <p className="text-white font-bold">{order.customerName || 'Nessun nome'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 uppercase tracking-widest text-[10px] font-black">Email</p>
                                <p className="text-white font-bold">{order.customerEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="rounded-soft-xl border border-white/10 bg-white/5 shadow-glass p-8 space-y-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white flex items-center gap-3">
                            <MapPin className="text-coral" size={20} /> Spedizione
                        </h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <p>{order.addressLine1}</p>
                            {order.addressLine2 && <p>{order.addressLine2}</p>}
                            <p>{order.postalCode} {order.city}</p>
                            <p className="font-bold text-white uppercase">{order.country}</p>
                        </div>
                    </div>

                    {/* Chronology Info */}
                    <div className="rounded-soft-xl border border-white/10 bg-white/5 shadow-glass p-8 space-y-6 backdrop-blur-sm">
                        <h3 className="font-bold text-white flex items-center gap-3">
                            <Calendar className="text-mint" size={20} /> Cronologia
                        </h3>
                        <div className="space-y-4 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>Creato il</span>
                                <span className="text-white font-bold">{new Date(order.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Ultimo update</span>
                                <span className="text-white font-bold">{new Date(order.updatedAt).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
