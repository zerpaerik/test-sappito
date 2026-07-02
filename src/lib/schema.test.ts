import { describe, expect, it } from "vitest";
import { solicitudSchema } from "./schema";

const baseValida = {
  cliente: "Juan Pérez",
  cedula: "V-12345678",
  email: "juan@example.com",
  vehiculo: "Toyota Corolla",
  precioVenta: "20000",
  inicial: "5000",
};

/** Devuelve los mensajes de error por campo de un parseo fallido. */
function erroresPorCampo(datos: unknown): Record<string, string> {
  const resultado = solicitudSchema.safeParse(datos);
  if (resultado.success) return {};
  return Object.fromEntries(
    resultado.error.issues.map((issue) => [issue.path.join("."), issue.message]),
  );
}

describe("solicitudSchema", () => {
  it("acepta datos válidos y coerciona los montos a número", () => {
    const resultado = solicitudSchema.safeParse(baseValida);
    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.precioVenta).toBe(20000);
      expect(resultado.data.inicial).toBe(5000);
    }
  });

  it("exige nombre de al menos 3 caracteres", () => {
    expect(erroresPorCampo({ ...baseValida, cliente: "Jo" })).toHaveProperty(
      "cliente",
    );
  });

  it("valida el formato de la cédula", () => {
    expect(erroresPorCampo({ ...baseValida, cedula: "12345" })).toHaveProperty(
      "cedula",
    );
  });

  it("rechaza un email inválido", () => {
    expect(
      erroresPorCampo({ ...baseValida, email: "no-es-email" }),
    ).toHaveProperty("email");
  });

  it("exige que la inicial sea menor que el precio de venta", () => {
    const errores = erroresPorCampo({
      ...baseValida,
      precioVenta: "10000",
      inicial: "10000",
    });
    expect(errores.inicial).toBe("La inicial debe ser menor que el precio de venta");
  });
});
