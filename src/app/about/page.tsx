import { Mail, MapPin, Instagram, Facebook, Sparkles, Palette, Heart } from 'lucide-react';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero / Intro */}
      <section className="relative h-[70vh] overflow-hidden rounded-soft-xl shadow-soft">
        <Image
          src="/photo1.png"
          alt="Vittoria Laboccetta nel suo studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-6xl font-black tracking-tighter md:text-8xl">La mia <span className="text-sun">Storia</span>.</h1>
            <p className="text-xl font-medium opacity-90 md:text-2xl italic">"Dal corpo alla materia, ogni creazione è un respiro."</p>
          </div>
        </div>
      </section>

      {/* Bio & Philosophy */}
      <section className="mx-auto max-w-4xl space-y-16 px-6">
        <div className="prose prose-xl prose-invert max-w-none leading-relaxed text-gray-400">
          <h2 className="text-4xl font-black text-white tracking-tight mb-8">Vittoria Laboccetta</h2>
          <p className="font-bold text-primary text-2xl">
            Artista e Arteterapeuta radicata nel calore creativo di Napoli.
          </p>
          <p>
            Vistoria ArtLab è il punto d'incontro tra il mio percorso personale e la materia che prende vita. Nel mio laboratorio a Napoli, esploro il confine tra arte visiva e benessere interiore. La mia filosofia, **"dal corpo alla materia"**, nasce dalla convinzione che ogni gesto creativo sia un'estensione del nostro essere, un modo per dare forma a ciò che spesso non ha parole.
          </p>
          <p>
            Oltre alla creazione di opere originali e oggetti d'arte su commissione, dedico una parte fondamentale della mia attività all'**arteterapia**. Accompagno le persone in percorsi di riscoperta attraverso l'uso consapevole del colore e dei materiali, trasformando l'atto del creare in un momento di cura e ascolto profondo.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass rounded-soft-xl p-10 space-y-4 border border-white/5">
            <Sparkles className="text-sun" size={32} />
            <h3 className="text-2xl font-bold">L'Arteterapia</h3>
            <p className="text-gray-400">Non si tratta di saper dipingere, ma di lasciarsi fluire. I miei laboratori a Napoli sono spazi sicuri dove la creatività diventa medicina per l'anima.</p>
          </div>
          <div className="glass rounded-soft-xl p-10 space-y-4 border border-white/5">
            <Palette className="text-coral" size={32} />
            <h3 className="text-2xl font-bold">Materia su Misura</h3>
            <p className="text-gray-400">Ogni opera su commissione è un dialogo. Ascolto le tue storie per tradurle in colori e forme che possano abitare i tuoi spazi con intenzione.</p>
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">Il Laboratorio</h2>
          <p className="text-gray-500">Istantanee dal cuore del processo creativo.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-0">
          {[2, 3, 4, 5, 7, 8, 12, 13].map((n) => (
            <div key={n} className="relative aspect-square overflow-hidden rounded-2xl shadow-soft border border-white/5">
              <Image src={`/photo${n}.png`} alt="Studio Detail" fill className="object-cover hover:scale-105 transition duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <section className="flex flex-col items-center gap-12 border-t border-white/10 pt-24 text-center px-6">
        <h2 className="text-4xl font-black tracking-tight">Iniziamo un Viaggio Insieme</h2>
        <div className="flex flex-wrap justify-center gap-12 text-gray-400">
          <div className="flex flex-col items-center gap-3">
            <Mail className="text-primary" size={32} />
            <p className="font-semibold text-lg text-white">ciao@vistoria.art</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MapPin className="text-secondary" size={32} />
            <p className="font-semibold text-lg text-center text-white">Laboratorio: Napoli, Italia</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/vistoria_art/" target="_blank" className="rounded-full bg-white/5 p-5 shadow-soft hover:scale-110 active:scale-90 transition border border-white/10">
            <Instagram size={28} className="text-coral" />
          </a>
        </div>
      </section>
    </div>
  );
}
