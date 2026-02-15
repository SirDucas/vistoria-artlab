import { prisma } from '@/lib/prisma';
import { Mail, Send, Phone, MessageSquare } from 'lucide-react';

export default async function ContactPage() {
  const content = await prisma.siteContent.findUnique({ where: { key: 'contact' } });

  return (
    <div className="space-y-24 pb-20">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Contatti</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Hai una domanda, una richiesta di personalizzazione o vuoi semplicemente salutarci? Siamo qui per te.</p>
      </header>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4 rounded-soft-xl bg-white p-8 shadow-soft">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={24} />
              </div>
              <h3 className="font-bold">E-mail</h3>
              <p className="text-sm text-gray-500">Ti risponderemo entro 24 ore lavorative.</p>
              <p className="font-semibold">hello@vistoria-artlab.it</p>
            </div>
            <div className="space-y-4 rounded-soft-xl bg-white p-8 shadow-soft">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Phone size={24} />
              </div>
              <h3 className="font-bold">Telefono</h3>
              <p className="text-sm text-gray-500">Disponibili Lun-Ven, 9:00 - 18:00</p>
              <p className="font-semibold">+39 02 123 4567</p>
            </div>
            <div className="space-y-4 rounded-soft-xl bg-white p-8 shadow-soft sm:col-span-2">
              <div className="h-12 w-12 rounded-xl bg-sun/10 flex items-center justify-center text-sun">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold">Studio Visit</h3>
              <p className="text-sm text-gray-500">Preferiamo visite su appuntamento per darti la migliore esperienza.</p>
              <p className="font-semibold">Via Tortona 12, Milano (MI)</p>
            </div>
          </div>

          <div className="rounded-soft-xl overflow-hidden shadow-soft h-64 bg-muted flex items-center justify-center">
            <p className="font-bold text-gray-400 italic">[Mappa Interattiva Milano]</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-soft-xl glass p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Inviaci un Messaggio</h2>
            <p className="text-gray-500 text-sm">Tutti i campi sono obbligatori.</p>
          </div>

          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest">Nome</label>
                <input required placeholder="Giacomo" className="w-full rounded-xl border-border bg-white px-4 py-3 shadow-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest">E-mail</label>
                <input required type="email" placeholder="giacomo@esempio.it" className="w-full rounded-xl border-border bg-white px-4 py-3 shadow-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest">Oggetto</label>
              <select className="w-full rounded-xl border-border bg-white px-4 py-3 shadow-sm">
                <option>Info sui prodotti</option>
                <option>Personalizzazioni</option>
                <option>Shipping & Ordini</option>
                <option>Altro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest">Messaggio</label>
              <textarea required rows={5} placeholder="Descrivi qui la tua richiesta..." className="w-full rounded-xl border-border bg-white px-4 py-3 shadow-sm resize-none" />
            </div>
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              Invia Messaggio <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
