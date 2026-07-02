import seed from "../../data/solicitudes.json";
import type { SolicitudData } from "./schema";
import type { Solicitud } from "./types";

/**
 * Almacén de solicitudes en memoria.
 *
 * Se guarda en `globalThis` para que los datos sobrevivan al hot-reload
 * de desarrollo (los módulos se reevalúan, el objeto global no). Es
 * deliberadamente simple: al reiniciar el servidor se vuelve al dataset
 * semilla. Para persistencia real se cambiaría esta capa por una base de datos.
 */
const globalParaStore = globalThis as unknown as {
  __solicitudes?: Solicitud[];
};

function db(): Solicitud[] {
  if (!globalParaStore.__solicitudes) {
    // Copiamos el dataset para no mutar el JSON importado.
    globalParaStore.__solicitudes = (seed as Solicitud[]).map((s) => ({ ...s }));
  }
  return globalParaStore.__solicitudes;
}

export function listarSolicitudes(): Solicitud[] {
  return db();
}

export function obtenerSolicitud(id: string): Solicitud | undefined {
  return db().find((solicitud) => solicitud.id === id);
}

export function crearSolicitud(datos: SolicitudData): Solicitud {
  const nueva: Solicitud = {
    id: siguienteId(),
    ...datos,
    estado: "Borrador",
  };
  // La más reciente se muestra primero en el listado.
  db().unshift(nueva);
  return nueva;
}

function siguienteId(): string {
  const numeros = db()
    .map((solicitud) => Number(solicitud.id))
    .filter((n) => Number.isFinite(n));
  const maximo = numeros.length > 0 ? Math.max(...numeros) : 0;
  return String(maximo + 1);
}
