import { stripe } from '@/lib/stripe';
import { z } from 'zod';

const bodySchema = z.object({
  items: z.array(z.object({ productId: z.string(), title: z.string(), priceCents: z.number(), quantity: z.number(), image: z.string().optional() })).min(1)
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return Response.json({ error: 'Invalid payload' }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: parsed.data.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: item.priceCents,
        product_data: { name: item.title, images: item.image ? [item.image] : undefined }
      }
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    metadata: {
      cart: JSON.stringify(parsed.data.items)
    }
  });

  return Response.json({ url: session.url });
}
