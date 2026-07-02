"use client";

import { useMemo, useState } from "react";
import { Filtros, type FiltroEstado } from "@/components/Filtros";
import { SolicitudCard } from "@/components/SolicitudCard";
import { useSolicitudes } from "@/hooks/useSolicitudes";

export default function ListadoPage() {
  const { solicitudes, cargando, error, recargar } = useSolicitudes();
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState<FiltroEstado>("Todas");

  const filtradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return solicitudes.filter((solicitud) => {
      const coincideCliente = solicitud.cliente.toLowerCase().includes(texto);
      const coincideEstado = estado === "Todas" || solicitud.estado === estado;
      return coincideCliente && coincideEstado;
    });
  }, [solicitudes, busqueda, estado]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Solicitudes de crédito
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gestiona y revisa las solicitudes de financiamiento.
        </p>
      </header>

      <Filtros
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        estado={estado}
        onEstadoChange={setEstado}
      />

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {filtradas.length} {filtradas.length === 1 ? "resultado" : "resultados"}
      </p>

      {cargando ? (
        <p className="text-sm text-zinc-500">Cargando solicitudes…</p>
      ) : error ? (
        <div className="text-sm text-rose-600">
          <p>{error}</p>
          <button type="button" onClick={recargar} className="mt-2 underline">
            Reintentar
          </button>
        </div>
      ) : filtradas.length === 0 ? (
        <p className="text-sm text-zinc-500">No hay solicitudes para mostrar.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((solicitud) => (
            <SolicitudCard key={solicitud.id} solicitud={solicitud} />
          ))}
        </div>
      )}
    </div>
  );
}
