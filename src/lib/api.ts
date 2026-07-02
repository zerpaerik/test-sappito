import type { SolicitudData } from "./schema";
import type { Solicitud } from "./types";

const BASE = "/api/solicitudes";

/** Extrae el mensaje de error de una respuesta fallida y lanza. */
async function lanzarError(res: Response, porDefecto: string): Promise<never> {
  let mensaje = porDefecto;
  try {
    const data = await res.json();
    if (typeof data?.error === "string") mensaje = data.error;
  } catch {
    // La respuesta no traía JSON; usamos el mensaje por defecto.
  }
  throw new Error(mensaje);
}

/** Cliente de la API de solicitudes (lado navegador). */
export const solicitudesApi = {
  async listar(signal?: AbortSignal): Promise<Solicitud[]> {
    const res = await fetch(BASE, { signal });
    if (!res.ok) await lanzarError(res, "No se pudieron cargar las solicitudes");
    return res.json();
  },

  async obtener(id: string, signal?: AbortSignal): Promise<Solicitud> {
    const res = await fetch(`${BASE}/${id}`, { signal });
    if (!res.ok) await lanzarError(res, "No se pudo cargar la solicitud");
    return res.json();
  },

  async crear(datos: SolicitudData): Promise<Solicitud> {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (!res.ok) await lanzarError(res, "No se pudo crear la solicitud");
    return res.json();
  },
};
