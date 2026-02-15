import { Mail, Send, Phone, MessageSquare, Instagram } from 'lucide-react';
import Image from 'next/image';

export default async function ContactPage() {
  return (
    <div className="space-y-24 pb-20">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Contatti</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Vittoria è a tua disposizione per informazioni sulle opere, laboratori di arteterapia o commissioni personalizzate.</p>
      </header>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4 rounded-soft-xl bg-white/5 border border-white/5 p-8 shadow-soft">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Mail size={24} />
              </div>
              <h3 className="font-bold">E-mail</h3>
              <p className="text-sm text-gray-500">Scrivimi per ogni richiesta.</p>
              <p className="font-semibold text-white">ciao@vistoria.art</p>
            </div>
            <div className="space-y-4 rounded-soft-xl bg-white/5 border border-white/5 p-8 shadow-soft">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Instagram size={24} />
              </div>
              <h3 className="font-bold">Instagram</h3>
              <p className="text-sm text-gray-500">Segui il processo creativo.</p>
              <a href="https://www.instagram.com/vistoria_art/" target="_blank" className="font-semibold text-coral hover:text-red-400 transition-colors">@vistoria_art</a>
            </div>
            <div className="space-y-4 rounded-soft-xl bg-white/5 border border-white/5 p-8 shadow-soft sm:col-span-2">
              <div className="h-12 w-12 rounded-xl bg-sun/10 flex items-center justify-center text-sun">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold">Studio & Workshop</h3>
              <p className="text-sm text-gray-500">Ricevo su appuntamento a Napoli per visite in studio e sessioni di arteterapia.</p>
              <p className="font-semibold text-white">Napoli, Italia</p>
            </div>
          </div>

          <div className="relative rounded-soft-xl overflow-hidden shadow-soft h-64 border border-white/5 bg-white/5">
            <Image src="/photo7.png" alt="Studio details" fill className="object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full font-bold shadow-sm border border-white/10 text-white">
                [Mappa: Napoli, Centro Storico]
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-soft-xl glass p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Inviaci un Messaggio</h2>
            <p className="text-gray-400 text-sm">Raccontami la tua idea o chiedimi info sui laboratori.</p>
          </div>

          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Nome</label>
                <input required placeholder="Il tuo nome" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-sm focus:border-primary outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">E-mail</label>
                <input required type="email" placeholder="email@esempio.it" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-sm focus:border-primary outline-none transition" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Oggetto</label>
              <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-sm focus:border-primary outline-none transition appearance-none cursor-pointer">
                <option className="bg-black">Info sui prodotti</option>
                <option className="bg-black">Laboratori di Arteterapia</option>
                <option className="bg-black">Opere su commissione</option>
                <option className="bg-black">Altro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">Messaggio</label>
              <textarea required rows={5} placeholder="Descrivi qui la tua richiesta..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-sm resize-none focus:border-primary outline-none transition" />
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
