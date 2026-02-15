import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = productSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });
  const data = parsed.data;
  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...data,
      tags: data.tags.split(',').map((v) => v.trim()),
      materials: data.materials.split(',').map((v) => v.trim())
    }
  });
  return Response.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  // Logical delete: set isDeleted to true
  await prisma.product.update({
    where: { id: params.id },
    data: { isDeleted: true }
  });

  return Response.json({ ok: true });
}
