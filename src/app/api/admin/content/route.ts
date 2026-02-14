import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = await req.json();
  await Promise.all(payload.map((item: any) => prisma.siteContent.upsert({ where: { key: item.key }, update: { title: item.title, body: item.body }, create: item })));
  return Response.json({ ok: true });
}
