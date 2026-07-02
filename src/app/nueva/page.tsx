import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SolicitudForm } from "@/components/SolicitudForm";

export default function NuevaSolicitudPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al listado
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Nueva solicitud</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Completa los datos del cliente y del financiamiento.
        </p>
      </header>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <SolicitudForm />
      </div>
    </div>
  );
}
