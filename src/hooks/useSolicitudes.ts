"use client";

import { useCallback, useEffect, useState } from "react";
import { solicitudesApi } from "@/lib/api";
import type { Solicitud } from "@/lib/types";

interface EstadoSolicitudes {
  solicitudes: Solicitud[];
  cargando: boolean;
  error: string | null;
}

/**
 * Carga las solicitudes desde la API y expone su estado asíncrono
 * (cargando / error / datos) junto con una función para recargar.
 */
export function useSolicitudes() {
  const [estado, setEstado] = useState<EstadoSolicitudes>({
    solicitudes: [],
    cargando: true,
    error: null,
  });

  const cargar = useCallback(async (signal?: AbortSignal) => {
    setEstado((previo) => ({ ...previo, cargando: true, error: null }));
    try {
      const solicitudes = await solicitudesApi.listar(signal);
      setEstado({ solicitudes, cargando: false, error: null });
    } catch (error) {
      // Si el efecto se limpió (navegación), ignoramos el aborto.
      if (signal?.aborted) return;
      setEstado({
        solicitudes: [],
        cargando: false,
        error: error instanceof Error ? error.message : "Error inesperado",
      });
    }
  }, []);

  useEffect(() => {
    const controlador = new AbortController();
    cargar(controlador.signal);
    return () => controlador.abort();
  }, [cargar]);

  return {
    solicitudes: estado.solicitudes,
    cargando: estado.cargando,
    error: estado.error,
    recargar: () => cargar(),
  };
}
