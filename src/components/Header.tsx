import Link from "next/link";
import { Car, Plus } from "lucide-react";
import { botonPrimario } from "@/components/ui/estilos";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">
            <Car className="h-5 w-5" />
          </span>
          CrediApp
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/nueva" className={botonPrimario}>
            <Plus className="h-4 w-4" />
            Nueva solicitud
          </Link>
        </div>
      </div>
    </header>
  );
}
