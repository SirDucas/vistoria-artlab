import { contactSchema } from '@/lib/validators';
import nodemailer from 'nodemailer';

const bucket = new Map<string, { count: number; ts: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'local';
  const record = bucket.get(ip) || { count: 0, ts: Date.now() };
  if (Date.now() - record.ts > 60_000) {
    record.count = 0;
    record.ts = Date.now();
  }
  record.count += 1;
  bucket.set(ip, record);
  if (record.count > 10) return Response.json({ error: 'Too many requests' }, { status: 429 });

  const parsed = contactSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });

  if (!process.env.SMTP_HOST) return Response.json({ ok: true, warning: 'SMTP non configurato' });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_TO_EMAIL,
    subject: `Nuovo messaggio da ${parsed.data.name}`,
    text: `${parsed.data.message}\n\nEmail: ${parsed.data.email}`
  });

  return Response.json({ ok: true });
}
