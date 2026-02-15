import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators';
import { slugify } from '@/lib/utils';

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    include: { images: true },
    orderBy: { createdAt: 'desc' }
  });
  return Response.json(products);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const input = await req.json();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });
  const data = parsed.data;
  const product = await prisma.product.create({
    data: {
      ...data,
      slug: slugify(data.title),
      tags: data.tags.split(',').map((v) => v.trim()),
      materials: data.materials.split(',').map((v) => v.trim()),
      images: { create: data.images.map((url, i) => ({ url, position: i })) }
    }
  });
  return Response.json(product);
}
