import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/shop/product-card';
import { Palette, Sparkles, Heart } from 'lucide-react';

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    include: { images: true },
    take: 8,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-soft-xl bg-artistic-gradient p-12 text-white shadow-soft-lg md:p-24">
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur-md">
            <Sparkles size={16} />
            <span>Studio d'Arte Artigianale</span>
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-tighter md:text-7xl">
            L'Arte che <br /> <span className="text-sun">Abita</span> i tuoi spazi.
          </h1>
          <p className="text-xl font-medium opacity-90 leading-relaxed md:text-2xl">
            Piccole opere originali, quadri vibranti e oggettistica d’autore nati nel cuore del colore.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="btn-secondary text-lg">
              Esplora la Collezione
            </Link>
            <Link href="/about" className="rounded-full border-2 border-white/50 bg-white/10 px-6 py-3 font-bold backdrop-blur-sm transition hover:bg-white hover:text-primary">
              La nostra Storia
            </Link>
          </div>
        </div>
        {/* Abstract Shapes */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-sun/20 blur-3xl" />
        <div className="absolute -bottom-20 right-40 h-80 w-80 rounded-full bg-coral/20 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="grid gap-12 md:grid-cols-3">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sun/10 text-sun shadow-sm">
            <Palette size={32} />
          </div>
          <h3 className="text-xl font-bold">Unicità Garantita</h3>
          <p className="text-gray-500">Ogni pezzo è unico, firmato e corredato di certificato di autenticità.</p>
        </div>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-coral/10 text-coral shadow-sm">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold">Fatto a Mano</h3>
          <p className="text-gray-500">Lavorazione artigianale con materiali di pregio e amore per il dettaglio.</p>
        </div>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-sm">
            <Sparkles size={32} />
          </div>
          <h3 className="text-xl font-bold">Spedizioni Sicure</h3>
          <p className="text-gray-500">Imballaggio artistico rinforzato per proteggere la tua opera nel viaggio.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="mb-12 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-foreground">Nuovi Arrivi</h2>
            <p className="mt-2 text-lg text-gray-500">Scopri le ultime creazioni appena nate in laboratorio.</p>
          </div>
          <Link href="/shop" className="group font-bold text-primary flex items-center gap-2">
            Vedi tutto lo Shop <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-soft-xl bg-muted p-20 text-center">
            <p className="text-xl font-medium text-gray-400">La galleria è temporaneamente vuota. Torna presto!</p>
          </div>
        )}
      </section>

      {/* About Preview */}
      <section className="grid items-center gap-16 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-soft-xl shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop"
            alt="Artista all'opera"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-sun">Il Laboratorio</p>
            <p className="text-2xl font-bold">Dove nasce la magia.</p>
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-black tracking-tight">Oltre il Quadro.</h2>
          <p className="text-xl leading-relaxed text-gray-600">
            Vistoria ArtLab non è solo un e-commerce, è un viaggio nel colore. Fondato a Milano, il nostro studio esplora il confine tra arte visiva e oggetto quotidiano.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <p className="font-semibold text-foreground">Materiali eco-sostenibili e naturali.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <p className="font-semibold text-foreground">Supporto diretto agli artisti locali.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-coral" />
              <p className="font-semibold text-foreground">Personalizzazioni su misura.</p>
            </div>
          </div>
          <Link href="/about" className="btn-primary inline-block">Scopri di più su di noi</Link>
        </div>
      </section>
    </div>
  );
}
