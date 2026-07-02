import { z } from "zod";

/**
 * Esquema de validación de una solicitud nueva.
 * Se usa tanto en el formulario (react-hook-form) como en el
 * endpoint POST, de modo que cliente y servidor comparten las reglas.
 *
 * Los montos se reciben como texto desde los inputs, por eso se
 * coercionan a número antes de validarlos.
 */
export const solicitudSchema = z
  .object({
    cliente: z
      .string()
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    cedula: z
      .string()
      .trim()
      .regex(/^[VE]-\d{6,9}$/i, "Formato inválido. Ejemplo: V-12345678"),
    email: z.string().trim().email("Ingresa un correo válido"),
    vehiculo: z.string().trim().min(1, "El vehículo es requerido"),
    precioVenta: z.coerce
      .number()
      .positive("El precio de venta debe ser mayor a 0"),
    inicial: z.coerce.number().positive("La inicial debe ser mayor a 0"),
  })
  .refine((datos) => datos.inicial < datos.precioVenta, {
    path: ["inicial"],
    message: "La inicial debe ser menor que el precio de venta",
  });

/** Valores tal como los maneja el formulario (todo como texto). */
export interface SolicitudFormValues {
  cliente: string;
  cedula: string;
  email: string;
  vehiculo: string;
  precioVenta: string;
  inicial: string;
}

/** Datos ya validados y normalizados (montos como number). */
export type SolicitudData = z.output<typeof solicitudSchema>;

/** Valores iniciales del formulario. */
export const solicitudFormValuesIniciales: SolicitudFormValues = {
  cliente: "",
  cedula: "",
  email: "",
  vehiculo: "",
  precioVenta: "",
  inicial: "",
};
