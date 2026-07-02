"use client";

import { useCallback, useEffect, useState } from "react";
import { solicitudesApi } from "@/lib/api";
import type { Solicitud } from "@/lib/types";

interface EstadoSolicitud {
  solicitud: Solicitud | null;
  cargando: boolean;
  error: string | null;
}

/** Carga una solicitud por id y expone su estado asíncrono. */
export function useSolicitud(id: string) {
  const [estado, setEstado] = useState<EstadoSolicitud>({
    solicitud: null,
    cargando: true,
    error: null,
  });

  const cargar = useCallback(
    async (signal?: AbortSignal) => {
      setEstado((previo) => ({ ...previo, cargando: true, error: null }));
      try {
        const solicitud = await solicitudesApi.obtener(id, signal);
        setEstado({ solicitud, cargando: false, error: null });
      } catch (error) {
        if (signal?.aborted) return;
        setEstado({
          solicitud: null,
          cargando: false,
          error: error instanceof Error ? error.message : "Error inesperado",
        });
      }
    },
    [id],
  );

  useEffect(() => {
    const controlador = new AbortController();
    cargar(controlador.signal);
    return () => controlador.abort();
  }, [cargar]);

  return {
    solicitud: estado.solicitud,
    cargando: estado.cargando,
    error: estado.error,
    recargar: () => cargar(),
  };
}
