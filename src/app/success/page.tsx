import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center space-y-8">
      <div className="rounded-full bg-mint/10 p-6 text-mint">
        <CheckCircle2 size={80} strokeWidth={1.5} />
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Grazie per l'Acquisto!</h1>
        <p className="text-xl text-gray-500 max-w-md mx-auto">
          L'opera ha trovato una nuova casa. Riceverai presto una mail di conferma con i dettagli della spedizione.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/shop" className="btn-primary">
          Torna allo Shop
        </Link>
        <Link href="/" className="btn-secondary">
          Pagina Iniziale
        </Link>
      </div>
      {searchParams.session_id && (
        <p className="text-xs font-mono text-gray-400">ID Ordine: {searchParams.session_id.slice(-12)}</p>
      )}
    </div>
  );
}
