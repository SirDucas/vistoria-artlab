import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/product-card';
import { Palette, Sparkles, Heart, Package, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    include: { images: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-24 pb-20">
      <section className="relative overflow-hidden rounded-soft-xl bg-black py-20 lg:py-32">
        <div className="absolute inset-0 bg-artistic-gradient opacity-10 blur-3xl" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 text-center lg:flex-row lg:text-left">
          <div className="flex-1 space-y-8">
            <div className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
              Napoli, Italia
            </div>
            <h1 className="text-6xl font-black leading-[1.1] tracking-tighter text-white lg:text-8xl">
              Dal corpo <br />
              <span className="bg-artistic-gradient bg-clip-text text-transparent italic">alla materia.</span>
            </h1>
            <p className="text-xl font-medium leading-relaxed text-gray-400">
              Vittoria Laboccetta crea opere su commissione e ti accompagna attraverso il potere trasformativo dell’arteterapia. Nel cuore di Napoli, dove l’arte incontra la cura.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <Link href="/shop" className="btn-primary px-10 py-4 text-lg">Esplora la Galleria</Link>
              <Link href="/about" className="rounded-full border border-white/10 px-10 py-4 text-lg font-bold transition hover:bg-white/5">La mia storia</Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-md flex-1 overflow-hidden rounded-soft-xl shadow-soft-xl lg:max-w-none">
            <Image
              src="/photo6.png"
              alt="Vittoria Laboccetta Lab"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="grid gap-8 py-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="glass rounded-soft-xl p-10 space-y-4 border border-white/5">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Package size={24} />
          </div>
          <h3 className="text-2xl font-bold">Opere Uniche</h3>
          <p className="text-gray-400">Ogni creazione è un pezzo unico, nato dall’ispirazione del momento e dalla materia viva.</p>
        </div>
        <div className="glass rounded-soft-xl p-10 space-y-4 border border-white/5">
          <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            <Palette size={24} />
          </div>
          <h3 className="text-2xl font-bold">Commissioni</h3>
          <p className="text-gray-400">Collaboro con te per dare forma ai tuoi desideri e ai tuoi spazi con opere personalizzate.</p>
        </div>
        <div className="glass rounded-soft-xl p-10 space-y-4 border border-white/5">
          <div className="h-12 w-12 rounded-xl bg-sun/10 flex items-center justify-center text-sun">
            <Heart size={24} />
          </div>
          <h3 className="text-2xl font-bold">Arteterapia</h3>
          <p className="text-gray-400">Laboratori individuali e di gruppo a Napoli per riscoprire se stessi attraverso il gesto artistico.</p>
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="space-y-12 py-10">
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-white">Galleria Recente</h2>
            <p className="text-gray-400">Le ultime opere nate dalla materia nel laboratorio di Napoli.</p>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 text-lg font-bold text-primary transition-colors hover:text-secondary">
            Vedi tutto <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-soft-xl bg-white/5 border border-white/5 p-20 text-center">
            <p className="text-xl font-medium text-gray-500 italic">La galleria si sta popolando. Torna presto!</p>
          </div>
        )}
      </section>

      {/* Studio Banner */}
      <section className="relative overflow-hidden rounded-soft-xl bg-black py-32 border border-white/5">
        <Image src="/photo1.png" alt="Studio Background" fill className="object-cover opacity-20 filter grayscale" />
        <div className="relative mx-auto max-w-3xl text-center space-y-8 px-6">
          <h2 className="text-5xl font-black text-white">Il Laboratorio è vita.</h2>
          <p className="text-xl text-gray-400 italic font-medium leading-relaxed">
            "Nel cuore di Napoli, uno spazio di libertà dove il colore incontra l'emozione e si trasforma in materia tangibile."
          </p>
          <div className="pt-8">
            <Link href="/contact" className="btn-secondary px-12 py-4 text-xl">Prenota una Visita</Link>
          </div>
        </div>
      </section>

      {/* Community / Social Preview */}
      <section className="rounded-soft-xl bg-white/5 border border-white/5 p-12 lg:p-20 text-center space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-white">Segui il Viaggio su Instagram</h2>
          <p className="text-gray-400 max-w-xl mx-auto italic">"Dal corpo alla materia, ogni giorno un nuovo racconto di trasformazione."</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-soft border border-white/10 group">
              <Image src={`/photo${i + 10}.png`} alt="Studio details" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        <div className="pt-6">
          <a
            href="https://www.instagram.com/vistoria_art/"
            target="_blank"
            className="btn-primary inline-flex items-center gap-3 px-10 py-4 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          >
            <Heart size={20} /> @vistoria_art
          </a>
        </div>
      </section>
    </div>
  );
}
