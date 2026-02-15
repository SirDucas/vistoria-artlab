const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@vistoria.it' },
        update: {},
        create: {
            email: 'admin@vistoria.it',
            name: 'Vistoria Admin',
            passwordHash: hashedPassword,
            isAdmin: true,
        },
    });

    const products = [
        {
            title: 'Frammenti Urbani #1',
            slug: 'frammenti-urbani-1',
            description: 'Opera originale acrilico su tela. Esplorazione delle geometrie nascoste nei cortili milanesi.',
            priceCents: 12000,
            type: 'QUADRO',
            availability: 'IN_STOCK',
            category: 'Quadri',
            materials: ['Tela', 'Acrilico', 'Vernice protettiva'],
            widthCm: 30,
            heightCm: 40,
            quantity: 1,
            sku: 'FU-001',
            tags: ['Astratto', 'Milano', 'Materico'],
        },
        {
            title: 'Vaso "Goccia" Blu Cobalto',
            slug: 'vaso-goccia-blu',
            description: 'Ceramica artigianale smaltata a mano. Pezzo unico con sfumature organiche.',
            priceCents: 8500,
            type: 'OGGETTISTICA',
            availability: 'IN_STOCK',
            category: 'Oggettistica',
            materials: ['Argilla Bianca', 'Smalto Cobalto'],
            widthCm: 15,
            heightCm: 25,
            depthCm: 15,
            quantity: 3,
            sku: 'VG-002',
            tags: ['Ceramica', 'Design', 'Blu'],
        },
        {
            title: 'Studio di Luce Notturna',
            slug: 'studio-luce-notturna',
            description: 'Acquerello d’autore su carta cotone 300g. Studio sui riflessi della pioggia.',
            priceCents: 4500,
            type: 'QUADRO',
            availability: 'MADE_TO_ORDER',
            category: 'Opere su Carta',
            materials: ['Carta Cotone', 'Acquerello'],
            widthCm: 21,
            heightCm: 30,
            quantity: 1,
            sku: 'SLN-003',
            tags: ['Minimalista', 'Notte'],
        },
        {
            title: 'Anello "Materia" Argento',
            slug: 'anello-materia-argento',
            description: 'Anello in argento 925 lavorato a cera persa. Design irregolare e materico.',
            priceCents: 11000,
            type: 'OGGETTISTICA',
            availability: 'IN_STOCK',
            category: 'Gioielli',
            materials: ['Argento 925'],
            widthCm: 2,
            heightCm: 2,
            quantity: 5,
            sku: 'AM-004',
            tags: ['Argento', 'Artigianato'],
        },
        {
            title: 'Sinfonia in Giallo Sun',
            slug: 'sinfonia-giallo',
            description: 'Grande tela vibrante. Ideale per illuminare zone living moderne.',
            priceCents: 35000,
            type: 'QUADRO',
            availability: 'SOLD_OUT',
            category: 'Quadri',
            materials: ['Tela', 'Misto', 'Foglia Oro'],
            widthCm: 100,
            heightCm: 100,
            quantity: 0,
            sku: 'SG-005',
            tags: ['Gold', 'Vibrant'],
        },
        {
            title: 'Coppia Piatti "Labirinto"',
            slug: 'coppia-piatti-labirinto',
            description: 'Set di due piatti decorativi in porcellana dipinta a mano.',
            priceCents: 9500,
            type: 'OGGETTISTICA',
            availability: 'IN_STOCK',
            category: 'Oggettistica',
            materials: ['Porcellana', 'Oro 24k'],
            widthCm: 24,
            heightCm: 2,
            quantity: 2,
            sku: 'CPL-006',
            tags: ['Tavola', 'Prezioso'],
        }
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                ...p,
                images: {
                    create: [{ url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&h=800&auto=format&fit=crop' }]
                }
            },
        });
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
