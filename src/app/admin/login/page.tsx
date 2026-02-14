'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  return (
    <form className="mx-auto max-w-md space-y-3 rounded-soft bg-white p-8 shadow-soft" onSubmit={async (e) => { e.preventDefault(); const formData = new FormData(e.currentTarget); const res = await signIn('credentials', { email: formData.get('email'), password: formData.get('password'), redirect: true, callbackUrl: '/admin' }); if (res?.error) setError('Credenziali non valide'); }}>
      <h1 className="text-2xl font-bold">Login Admin</h1>
      <input className="w-full rounded border p-2" type="email" name="email" required placeholder="Email" />
      <input className="w-full rounded border p-2" type="password" name="password" required placeholder="Password" />
      <button className="w-full rounded bg-primary py-2 text-white">Entra</button>
      {error ? <p className="text-sm text-coral">{error}</p> : null}
    </form>
  );
}
