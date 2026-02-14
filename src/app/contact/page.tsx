'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  async function onSubmit(formData: FormData) {
    const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(formData)) });
    setStatus(response.ok ? 'Messaggio inviato!' : 'Errore invio');
  }

  return (
    <section className="max-w-xl">
      <h1 className="mb-4 text-3xl font-bold">Contatti</h1>
      <form action={onSubmit} className="space-y-3 rounded-soft bg-white p-6 shadow-soft">
        <input required name="name" placeholder="Nome" className="w-full rounded border p-2" />
        <input required name="email" type="email" placeholder="Email" className="w-full rounded border p-2" />
        <textarea required name="message" placeholder="Messaggio" className="h-40 w-full rounded border p-2" />
        <button className="rounded bg-primary px-4 py-2 text-white">Invia</button>
      </form>
      <p className="mt-2">{status}</p>
    </section>
  );
}
