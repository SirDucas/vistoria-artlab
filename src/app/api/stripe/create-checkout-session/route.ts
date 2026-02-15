import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { z } from 'zod';

const bodySchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    slug: z.string(),
    title: z.string(),
    priceCents: z.number(),
    quantity: z.number(),
    image: z.string().optional()
  })).min(1)
});

export async function POST(req: Request) {
  try {
    // Check if DB is reachable before anything else
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError) {
      console.error('Database connection error during checkout:', dbError);
      return Response.json(
        { error: 'Servizio temporaneamente non disponibile. Riprova tra pochi istanti.' },
        { status: 503 }
      );
    }

    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) return Response.json({ error: 'Invalid payload' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IT', 'FR', 'DE', 'ES', 'GB', 'US'],
      },
      line_items: parsed.data.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'eur',
          unit_amount: item.priceCents,
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : undefined,
            metadata: { productId: item.productId, slug: item.slug }
          }
        }
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId: 'guest', // Can be updated if auth is present
        cart: JSON.stringify(parsed.data.items.map(i => ({ id: i.productId, q: i.quantity })))
      }
    });

    return Response.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
