import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center space-y-8">
      <div className="rounded-full bg-coral/10 p-6 text-coral">
        <XCircle size={80} strokeWidth={1.5} />
      </div>
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight">Pagamento Annullato</h1>
        <p className="text-xl text-gray-500 max-w-md mx-auto">
          Il processo di pagamento è stato interrotto. Il tuo carrello è ancora pronto ad aspettarti.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/shop" className="btn-primary">
          Riprova allo Shop
        </Link>
        <Link href="/contact" className="btn-secondary">
          Hai bisogno di aiuto?
        </Link>
      </div>
    </div>
  );
}
