'use client';

import { useState } from 'react';

export default function ContentPage() {
  const [status, setStatus] = useState('');
  return (
    <form className="space-y-3 rounded-soft bg-white p-6 shadow-soft" onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const payload = [
        { key: 'about', title: String(formData.get('aboutTitle')), body: String(formData.get('aboutBody')) },
        { key: 'contact', title: String(formData.get('contactTitle')), body: String(formData.get('contactBody')) }
      ];
      const res = await fetch('/api/admin/content', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus(res.ok ? 'Contenuti aggiornati' : 'Errore');
    }}>
      <h1 className="text-2xl font-bold">Contenuti base</h1>
      <input name="aboutTitle" className="w-full rounded border p-2" placeholder="Titolo About" />
      <textarea name="aboutBody" className="w-full rounded border p-2" placeholder="Testo About" />
      <input name="contactTitle" className="w-full rounded border p-2" placeholder="Titolo Contact" />
      <textarea name="contactBody" className="w-full rounded border p-2" placeholder="Testo Contact" />
      <button className="rounded bg-primary px-4 py-2 text-white">Salva</button>
      <p>{status}</p>
    </form>
  );
}
