'use client';

import { useState } from 'react';

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await response.json();
    if (data.url) setImages((prev) => [...prev, data.url]);
  }

  return (
    <form className="space-y-3 rounded-soft bg-white p-6 shadow-soft" onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData.entries());
      const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, images, isUniquePiece: payload.isUniquePiece === 'on' }) });
      setStatus(res.ok ? 'Prodotto creato' : 'Errore creazione');
    }}>
      <h1 className="text-2xl font-bold">Nuovo prodotto</h1>
      <input name="title" className="w-full rounded border p-2" placeholder="Titolo" required />
      <textarea name="description" className="w-full rounded border p-2" placeholder="Descrizione" required />
      <input name="priceCents" type="number" className="w-full rounded border p-2" placeholder="Prezzo centesimi" required />
      <select name="type" className="w-full rounded border p-2"><option value="QUADRO">Quadro</option><option value="OGGETTISTICA">Oggettistica</option></select>
      <input name="category" className="w-full rounded border p-2" placeholder="Categoria" required />
      <input name="tags" className="w-full rounded border p-2" placeholder="tags,comma" required />
      <input name="materials" className="w-full rounded border p-2" placeholder="materiali,comma" required />
      <select name="availability" className="w-full rounded border p-2"><option value="IN_STOCK">In stock</option><option value="MADE_TO_ORDER">Made to order</option><option value="SOLD_OUT">Sold out</option></select>
      <input name="quantity" type="number" defaultValue={1} className="w-full rounded border p-2" />
      <input name="sku" className="w-full rounded border p-2" placeholder="SKU" required />
      <input name="weightGrams" type="number" className="w-full rounded border p-2" placeholder="Peso (g)" />
      <div className="grid grid-cols-3 gap-2"><input name="widthCm" type="number" step="0.1" className="rounded border p-2" placeholder="L" /><input name="heightCm" type="number" step="0.1" className="rounded border p-2" placeholder="H" /><input name="depthCm" type="number" step="0.1" className="rounded border p-2" placeholder="P" /></div>
      <label className="flex items-center gap-2"><input type="checkbox" name="isUniquePiece" defaultChecked /> Pezzo unico</label>
      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
      <p className="text-xs text-gray-500">Immagini caricate: {images.length}</p>
      <button className="rounded bg-primary px-4 py-2 text-white">Salva</button>
      <p>{status}</p>
    </form>
  );
}
