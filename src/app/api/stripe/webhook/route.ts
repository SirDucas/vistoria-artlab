import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return Response.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const items = JSON.parse(session.metadata.cart);

    // Create Order in DB
    const orderNumber = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        totalCents: session.amount_total,
        currency: session.currency,
        status: 'PAID',
        customerEmail: session.customer_details.email,
        customerName: session.customer_details.name,
        stripeSessionId: session.id,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.q,
            titleSnapshot: item.title || 'Product',
            skuSnapshot: item.sku || 'N/A',
            priceCents: 0, // Should be passed in metadata or fetched
          }))
        }
      }
    });

    // Update Product Stock/Availability
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (product) {
        const newQty = Math.max(0, product.quantity - item.q);
        await prisma.product.update({
          where: { id: item.id },
          data: {
            quantity: newQty,
            availability: newQty === 0 ? 'SOLD_OUT' : product.availability
          }
        });
      }
    }

    console.log('Order created and inventory updated:', order.id);
  }

  return Response.json({ received: true });
}
