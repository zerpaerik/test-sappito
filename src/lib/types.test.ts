import { describe, expect, it } from "vitest";
import { montoAFinanciar } from "./types";

describe("montoAFinanciar", () => {
  it("resta la inicial al precio de venta", () => {
    expect(montoAFinanciar({ precioVenta: 25000, inicial: 5000 })).toBe(20000);
  });

  it("es cero cuando la inicial iguala al precio", () => {
    expect(montoAFinanciar({ precioVenta: 12000, inicial: 12000 })).toBe(0);
  });
});
