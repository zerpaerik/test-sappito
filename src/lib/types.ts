/**
 * Modelo de dominio del mini-portal de solicitudes de crédito.
 */

/** Estados por los que puede pasar una solicitud. */
export const ESTADOS = ["Borrador", "En revisión", "Aprobada", "Rechazada"] as const;

export type Estado = (typeof ESTADOS)[number];

export interface Solicitud {
  id: string;
  cliente: string;
  cedula: string;
  email: string;
  vehiculo: string;
  /** Precio de venta del vehículo, en USD. */
  precioVenta: number;
  /** Cuota inicial que aporta el cliente, en USD. */
  inicial: number;
  estado: Estado;
}

/**
 * Monto que financia la entidad: precio de venta menos la inicial.
 * Es un valor derivado, por eso se calcula y no se persiste.
 */
export function montoAFinanciar(
  datos: Pick<Solicitud, "precioVenta" | "inicial">,
): number {
  return datos.precioVenta - datos.inicial;
}
