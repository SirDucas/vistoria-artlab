'use client';

import { useState } from 'react';

export default function OrdersPage() {
  const [status, setStatus] = useState('');

  return (
    <form className="space-y-3 rounded-soft bg-white p-6 shadow-soft" onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/admin/orders', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(formData)) });
      setStatus(res.ok ? 'Ordine aggiornato' : 'Errore');
    }}>
      <h1 className="text-2xl font-bold">Gestione ordini</h1>
      <input name="orderId" className="w-full rounded border p-2" placeholder="Order ID" required />
      <select name="status" className="w-full rounded border p-2"><option value="FULFILLED">Fulfilled</option><option value="CANCELLED">Cancelled</option><option value="REFUNDED">Refunded</option></select>
      <textarea name="internalNote" className="w-full rounded border p-2" placeholder="Nota interna" />
      <button className="rounded bg-primary px-4 py-2 text-white">Aggiorna</button>
      <p>{status}</p>
    </form>
  );
}
