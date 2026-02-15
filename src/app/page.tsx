import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/product-card';
import { Palette, Sparkles, Heart, Package, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { isDeleted: false },
    include: { images: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  // New images from the laboratory
  const labImages = [
    '/images/laboratorio/photo1.png', '/images/laboratorio/photo2.png', '/images/laboratorio/photo3.png',
    '/images/laboratorio/photo4.png', '/images/laboratorio/photo5.png', '/images/laboratorio/photo6.png',
    '/images/laboratorio/photo7.png', '/images/laboratorio/photo8.png', '/images/laboratorio/photo9.png',
    '/images/laboratorio/photo10.png', '/images/laboratorio/photo11.png', '/images/laboratorio/photo12.png',
    '/images/laboratorio/photo13.png', '/images/laboratorio/photo14.png', '/images/laboratorio/photo15.png',
    '/images/laboratorio/photo16.png', '/images/laboratorio/photo17.png', '/images/laboratorio/photo18.png',
    '/images/laboratorio/photo19.png', '/images/laboratorio/photo20.png', '/images/laboratorio/photo21.png',
    '/images/laboratorio/photo22.png'
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* New Hero Section with Horizontal Background */}
      <section className="relative h-[85vh] w-full overflow-hidden rounded-soft-xl bg-black">
        <Image
          src="/images/laboratorio/photo6.png"
          alt="Laboratory Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl font-black leading-[1.1] tracking-tighter text-white lg:text-[10rem] mb-12">
            Dal corpo <br />
            <span className="bg-artistic-gradient bg-clip-text text-transparent italic">alla materia.</span>
          </h1>
          <p className="text-xl font-medium max-w-2xl leading-relaxed text-gray-300 mb-16">
            Vittoria Laboccetta crea opere su commissione e ti accompagna attraverso il potere trasformativo dell’arteterapia. Nel cuore di Napoli, dove l’arte incontra la cura.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/shop" className="btn-primary px-12 py-5 text-xl">Esplora la Galleria</Link>
            <Link href="/about" className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-12 py-5 text-xl font-bold transition hover:bg-white/10">La mia storia</Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Narrative Section - Story of the Lab */}
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center py-10">
        <div className="space-y-8">
          <h2 className="text-5xl font-black text-white leading-tight">Raccontare la <br /><span className="text-primary italic">materia.</span></h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Ogni opera nel laboratorio nasce da un gesto istintivo. Seguiamo il processo creativo dalla scelta dei materiali grezzi fino alla finitura finale, dove ogni dettaglio racconta una storia di trasformazione e cura.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/images/laboratorio/photo14.png" alt="Detail 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image src="/images/laboratorio/photo19.png" alt="Detail 2" fill className="object-cover" />
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-soft-xl border border-white/10">
          <Image src="/images/laboratorio/photo7.png" alt="Studio Life" fill className="object-cover" />
        </div>
      </section>

      {/* Studio Banner - Optimized Visibility */}
      <section className="relative overflow-hidden rounded-soft-xl bg-black py-32 border border-white/10">
        <Image src="/images/laboratorio/photo1.png" alt="Studio Background" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-4xl text-center space-y-12 px-6">
          <h2 className="text-5xl font-black text-white">Il Laboratorio è vita.</h2>
          <p className="text-2xl text-white italic font-medium leading-relaxed max-w-3xl mx-auto">
            "Nel cuore di Napoli, uno spazio di libertà dove il colore incontra l'emozione e si trasforma in materia tangibile."
          </p>

          {/* Two side-by-side images instead of a button */}
          <div className="grid grid-cols-2 gap-6 pt-8 max-w-2xl mx-auto">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition hover:scale-105 duration-500">
              <Image src="/images/laboratorio/photo2.png" alt="Studio Experience 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition hover:scale-105 duration-500">
              <Image src="/images/laboratorio/photo3.png" alt="Studio Experience 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* "Il Laboratorio" - Expanded Gallery */}
      <section className="space-y-12 py-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-white">Il Laboratorio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Esplora l'atmosfera e il processo creativo all'interno del laboratorio di Napoli.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {labImages.map((src, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-soft border border-white/10 group">
              <Image src={src} alt={`Studio detail ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* Community / Social Preview */}
      <section className="rounded-soft-xl bg-white/5 border border-white/5 p-12 lg:p-20 text-center space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-white">Segui il Viaggio su Instagram</h2>
          <p className="text-gray-400 max-w-xl mx-auto italic">"Dal corpo alla materia, ogni giorno un nuovo racconto di trasformazione."</p>
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

