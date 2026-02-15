import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 px-4 py-16 text-center text-sm text-gray-400">
      <div className="flex justify-center gap-6 mb-8 text-gray-500">
        <a href="https://www.instagram.com/vistoria_art/" target="_blank" className="hover:text-primary transition-colors">
          <Instagram size={20} />
        </a>
      </div>
      <p className="font-medium">
        © {new Date().getFullYear()} Vistoria ArtLab · Creato con cura a <span className="text-secondary font-bold">Napoli</span>
      </p>
      <p className="mt-2 text-xs opacity-40 italic">"dal corpo alla materia"</p>
    </footer>
  );
}
