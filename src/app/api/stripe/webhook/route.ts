import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/email';
import { formatPrice } from '@/lib/utils';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (error) {
    console.error('Webhook signature validation failed', error);
    return new Response('Invalid signature', { status: 400 });
  }

  console.log('Stripe webhook event', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const cartRaw = session.metadata?.cart || '[]';
    const items = JSON.parse(cartRaw) as Array<{ productId: string; title: string; priceCents: number; quantity: number; image?: string }>;
    const order = await prisma.order.create({
      data: {
        orderNumber: `VA-${Date.now()}`,
        status: 'PAID',
        customerEmail: session.customer_details?.email || 'unknown@example.com',
        customerName: session.customer_details?.name || null,
        addressLine1: session.customer_details?.address?.line1 || null,
        addressLine2: session.customer_details?.address?.line2 || null,
        city: session.customer_details?.address?.city || null,
        postalCode: session.customer_details?.address?.postal_code || null,
        country: session.customer_details?.address?.country || null,
        totalCents: session.amount_total || 0,
        currency: (session.currency || 'eur').toUpperCase(),
        stripeSessionId: session.id,
        stripePaymentIntentId: String(session.payment_intent || ''),
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            titleSnapshot: item.title,
            skuSnapshot: item.productId,
            priceCents: item.priceCents,
            quantity: item.quantity,
            imageSnapshot: item.image
          }))
        }
      }
    });

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) continue;
      const newQty = Math.max(0, product.quantity - item.quantity);
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          quantity: newQty,
          availability: product.isUniquePiece || newQty === 0 ? 'SOLD_OUT' : product.availability
        }
      });
    }

    await sendOrderConfirmation(order.customerEmail, order.orderNumber, formatPrice(order.totalCents, order.currency));
  }

  return new Response('ok');
}
