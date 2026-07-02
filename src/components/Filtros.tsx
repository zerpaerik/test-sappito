"use client";

import { Search } from "lucide-react";
import { ESTADOS, type Estado } from "@/lib/types";

export type FiltroEstado = Estado | "Todas";

const OPCIONES: FiltroEstado[] = ["Todas", ...ESTADOS];

interface FiltrosProps {
  busqueda: string;
  onBusquedaChange: (valor: string) => void;
  estado: FiltroEstado;
  onEstadoChange: (estado: FiltroEstado) => void;
}

export function Filtros({
  busqueda,
  onBusquedaChange,
  estado,
  onEstadoChange,
}: FiltrosProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative sm:max-w-xs sm:flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          value={busqueda}
          onChange={(evento) => onBusquedaChange(evento.target.value)}
          placeholder="Buscar por cliente..."
          aria-label="Buscar por nombre de cliente"
          className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {OPCIONES.map((opcion) => {
          const activo = estado === opcion;
          return (
            <button
              key={opcion}
              type="button"
              onClick={() => onEstadoChange(opcion)}
              aria-pressed={activo}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activo
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-zinc-600 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
              }`}
            >
              {opcion}
            </button>
          );
        })}
      </div>
    </div>
  );
}
