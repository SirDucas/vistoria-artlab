import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { images: true } });
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(product);
}
