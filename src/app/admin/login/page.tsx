'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError('Credenziali non valide o accesso negato.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-artistic-gradient p-6">
      <div className="w-full max-w-md space-y-8 rounded-soft-xl bg-white/90 p-8 shadow-soft-xl backdrop-blur-md">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-primary">Vistoria <span className="text-secondary">Admin</span></h1>
          <p className="text-gray-500 font-medium text-sm uppercase tracking-widest">Accesso Riservato</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl bg-coral/10 p-4 text-sm font-bold text-coral text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vistoria.it"
                className="w-full rounded-xl border border-gray-200 bg-white/50 pl-11 pr-4 py-3 text-black placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white/50 pl-11 pr-4 py-3 text-black placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Accedi al Pannello'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Se hai dimenticato le credenziali, contatta il supporto tecnico.
        </p>
      </div>
    </div>
  );
}
