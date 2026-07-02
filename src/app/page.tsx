"use client";

import { useMemo, useState } from "react";
import { Cargando, ErrorVista, SinResultados, Vacio } from "@/components/estados";
import { Filtros, type FiltroEstado } from "@/components/Filtros";
import { SolicitudCard } from "@/components/SolicitudCard";
import { useSolicitudes } from "@/hooks/useSolicitudes";

/** Normaliza texto para buscar sin distinguir mayúsculas ni acentos. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function ListadoPage() {
  const { solicitudes, cargando, error, recargar } = useSolicitudes();
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState<FiltroEstado>("Todas");

  const filtradas = useMemo(() => {
    const texto = normalizar(busqueda.trim());
    return solicitudes.filter((solicitud) => {
      const coincideCliente = normalizar(solicitud.cliente).includes(texto);
      const coincideEstado = estado === "Todas" || solicitud.estado === estado;
      return coincideCliente && coincideEstado;
    });
  }, [solicitudes, busqueda, estado]);

  const hayContenido = !cargando && !error;

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

      {hayContenido && solicitudes.length > 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {filtradas.length} {filtradas.length === 1 ? "resultado" : "resultados"}
        </p>
      )}

      {cargando ? (
        <Cargando />
      ) : error ? (
        <ErrorVista mensaje={error} onReintentar={recargar} />
      ) : solicitudes.length === 0 ? (
        <Vacio />
      ) : filtradas.length === 0 ? (
        <SinResultados />
      ) : (
        <div className="grid animate-[fade-in_0.3s_ease-out] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((solicitud) => (
            <SolicitudCard key={solicitud.id} solicitud={solicitud} />
          ))}
        </div>
      )}
    </div>
  );
}
