import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { id: { contains: orderId } },
          { orderNumber: { contains: orderId } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    return Response.json(orders);
  }

  const orders = await prisma.order.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' }
  });
  return Response.json(orders);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { orderId, status, internalNote } = await req.json();
  const order = await prisma.order.update({ where: { id: orderId }, data: { status, internalNote } });
  return Response.json(order);
}
