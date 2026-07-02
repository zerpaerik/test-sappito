import Link from "next/link";
import {
  FileText,
  Plus,
  RotateCw,
  SearchX,
  TriangleAlert,
} from "lucide-react";
import { botonPrimario, botonSecundario } from "@/components/ui/estilos";

/** Skeleton mientras cargan las solicitudes. */
export function Cargando() {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 6 }).map((_, indice) => (
        <div
          key={indice}
          className="animate-pulse rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="h-5 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="h-8 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** No hay ninguna solicitud registrada todavía. */
export function Vacio() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
        <FileText className="h-6 w-6" />
      </div>
      <div>
        <p className="font-medium">No hay solicitudes</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Crea la primera solicitud para empezar.
        </p>
      </div>
      <Link href="/nueva" className={botonPrimario}>
        <Plus className="h-4 w-4" />
        Nueva solicitud
      </Link>
    </div>
  );
}

/** Hay solicitudes, pero ninguna coincide con los filtros. */
export function SinResultados() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
      <SearchX className="h-8 w-8 text-zinc-400" />
      <p className="font-medium">Sin resultados</p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Prueba con otro nombre o cambia el filtro de estado.
      </p>
    </div>
  );
}

/** Falló la carga de datos; permite reintentar. */
export function ErrorVista({
  mensaje,
  onReintentar,
}: {
  mensaje: string;
  onReintentar: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 py-16 text-center dark:border-rose-900 dark:bg-rose-950/40">
      <TriangleAlert className="h-8 w-8 text-rose-500" />
      <div>
        <p className="font-medium text-rose-800 dark:text-rose-300">
          No se pudieron cargar las solicitudes
        </p>
        <p className="text-sm text-rose-600 dark:text-rose-400">{mensaje}</p>
      </div>
      <button type="button" onClick={onReintentar} className={botonSecundario}>
        <RotateCw className="h-4 w-4" />
        Reintentar
      </button>
    </div>
  );
}
