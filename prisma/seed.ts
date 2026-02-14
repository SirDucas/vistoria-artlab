import { PrismaClient, ProductType, Availability } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const sampleProducts = Array.from({ length: 10 }).map((_, idx) => {
  const isQuadro = idx % 2 === 0;
  const number = idx + 1;
  return {
    slug: `opera-${number}`,
    title: isQuadro ? `Quadro Astratto ${number}` : `Oggetto Artistico ${number}`,
    description: 'Creazione artigianale originale, realizzata con cura in studio.',
    priceCents: 4500 + idx * 800,
    type: isQuadro ? ProductType.QUADRO : ProductType.OGGETTISTICA,
    category: isQuadro ? 'Collezione Tela' : 'Studio Objects',
    tags: isQuadro ? ['astratto', 'colori', 'galleria'] : ['ceramica', 'decor', 'handmade'],
    materials: isQuadro ? ['acrilico', 'tela'] : ['argilla', 'smalto'],
    widthCm: isQuadro ? 40 + idx * 2 : 20,
    heightCm: isQuadro ? 50 + idx * 2 : 18,
    depthCm: isQuadro ? 2.5 : 10,
    weightGrams: isQuadro ? 1200 : 900,
    sku: `ART-${1000 + number}`,
    availability: idx === 9 ? Availability.MADE_TO_ORDER : Availability.IN_STOCK,
    quantity: isQuadro ? 1 : 5,
    isUniquePiece: isQuadro,
    images: {
      create: [
        {
          url: `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80&sig=${number}`,
          alt: `Prodotto ${number}`,
          position: 0
        }
      ]
    }
  };
});

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.siteContent.deleteMany();

  for (const product of sampleProducts) {
    await prisma.product.create({ data: product });
  }

  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin12345', 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@vistoria.art' },
    update: { passwordHash: adminPassword, isAdmin: true, name: 'Admin' },
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@vistoria.art',
      passwordHash: adminPassword,
      isAdmin: true,
      name: 'Admin'
    }
  });

  await prisma.siteContent.createMany({
    data: [
      { key: 'about', title: 'Chi sono', body: 'Sono un’artista indipendente che unisce colore, texture e gioco.' },
      { key: 'contact', title: 'Contatti', body: 'Scrivimi: ciao@vistoria.art • Milano, Italia' }
    ]
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
