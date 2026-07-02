/** Clases de Tailwind reutilizables para botones y enlaces con estilo de botón. */

export const botonPrimario =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60";

export const botonSecundario =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

/** Clases de un input de formulario; resalta el borde cuando hay error. */
export function campoInput(hayError = false): string {
  return `w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 dark:bg-zinc-900 ${
    hayError
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/30 dark:border-rose-700"
      : "border-zinc-300 focus:border-red-500 focus:ring-red-500/30 dark:border-zinc-700"
  }`;
}
