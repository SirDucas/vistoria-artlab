import { prisma } from '@/lib/prisma';
import { Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default async function AboutPage() {
  const content = await prisma.siteContent.findUnique({ where: { key: 'about' } });

  return (
    <div className="space-y-24 pb-20">
      <section className="relative h-[60vh] overflow-hidden rounded-soft-xl shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1600&auto=format&fit=crop"
          alt="L'artista al lavoro"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-3xl space-y-6 p-6">
            <h1 className="text-6xl font-black tracking-tighter md:text-8xl">La nostra <span className="text-sun">Visione</span>.</h1>
            <p className="text-xl font-medium opacity-90 md:text-2xl">Oltre la tecnica, cerchiamo l'anima del colore.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12">
        <div className="prose prose-xl prose-slate max-w-none leading-relaxed text-gray-600">
          <p className="font-bold text-primary">Vistoria ArtLab nasce da una passione viscerale per l'artigianalità milanese e l'esplorazione del colore puro.</p>
          <p>{content?.body || "In un mondo sempre più digitale, crediamo nel potere tattile dell'arte. Ogni nostra opera è una conversazione tra artista e materia, un frammento di emozione catturato su tela o plasmato nella ceramica. Il nostro studio a Milano è un laboratorio di idee dove la tradizione incontra la giocosità moderna."}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-soft-xl bg-sun/10 p-8 space-y-4">
            <h3 className="text-2xl font-bold">L'Inspiration</h3>
            <p className="text-gray-600">Le nostre ispirazioni arrivano dalla vivacità urbana, dai mercati di Brera e dalla luce che filtra dai cortili nascosti di Milano.</p>
          </div>
          <div className="rounded-soft-xl bg-coral/10 p-8 space-y-4">
            <h3 className="text-2xl font-bold">La Qualità</h3>
            <p className="text-gray-600">Utilizziamo solo pigmenti di altissima qualità e supporti preparati a mano per garantire che l'opera duri nel tempo.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-12 border-t pt-24 text-center">
        <h2 className="text-4xl font-black tracking-tight">Rimaniamo in Contatto</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="flex flex-col items-center gap-3">
            <Mail className="text-primary" size={32} />
            <p className="font-bold">info@vistoria-artlab.it</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MapPin className="text-secondary" size={32} />
            <p className="font-bold">Studio: Via Tortona 12, Milano</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="rounded-full bg-white p-4 shadow-soft hover:scale-110 active:scale-90 transition">
            <Instagram size={24} className="text-coral" />
          </a>
          <a href="#" className="rounded-full bg-white p-4 shadow-soft hover:scale-110 active:scale-90 transition">
            <Facebook size={24} className="text-secondary" />
          </a>
        </div>
      </section>
    </div>
  );
}
