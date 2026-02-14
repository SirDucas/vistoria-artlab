import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { orderId, status, internalNote } = await req.json();
  const order = await prisma.order.update({ where: { id: orderId }, data: { status, internalNote } });
  return Response.json(order);
}
