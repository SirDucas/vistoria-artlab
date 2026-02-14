import { prisma } from '@/lib/prisma';

export default async function AboutPage() {
  const about = await prisma.siteContent.findUnique({ where: { key: 'about' } });
  return <section className="prose max-w-3xl"><h1>{about?.title || 'About'}</h1><p>{about?.body}</p></section>;
}
