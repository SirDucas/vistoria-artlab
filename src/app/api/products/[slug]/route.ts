import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      slug: params.slug,
      isDeleted: false
    },
    include: { images: true }
  });
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json(product);
}
