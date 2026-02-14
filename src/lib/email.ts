import nodemailer from 'nodemailer';

export async function sendOrderConfirmation(to: string, orderNumber: string, total: string) {
  if (!process.env.SMTP_HOST) {
    console.warn('SMTP non configurato: salto invio email conferma ordine');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Ordine confermato ${orderNumber}`,
    text: `Grazie per il tuo ordine ${orderNumber}. Totale: ${total}`
  });
}
