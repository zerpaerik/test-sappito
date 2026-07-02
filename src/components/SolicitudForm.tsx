"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader2 } from "lucide-react";
import { solicitudesApi } from "@/lib/api";
import { formatearUSD } from "@/lib/format";
import {
  solicitudFormValuesIniciales,
  solicitudSchema,
  type SolicitudData,
  type SolicitudFormValues,
} from "@/lib/schema";
import { montoAFinanciar } from "@/lib/types";
import { botonPrimario, botonSecundario, campoInput } from "@/components/ui/estilos";
import { useToast } from "@/components/ui/Toast";

/** Campo de formulario: etiqueta + control + mensaje de ayuda o error. */
function Campo({
  label,
  htmlFor,
  error,
  ayuda,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  ayuda?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
      ) : ayuda ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{ayuda}</p>
      ) : null}
    </div>
  );
}

export function SolicitudForm() {
  const router = useRouter();
  const { mostrar } = useToast();
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SolicitudFormValues, unknown, SolicitudData>({
    // El formulario maneja los montos como texto y zod los coerciona a número
    // al validar; ajustamos el tipo del resolver a los valores del formulario.
    resolver: zodResolver(solicitudSchema) as Resolver<
      SolicitudFormValues,
      unknown,
      SolicitudData
    >,
    defaultValues: solicitudFormValuesIniciales,
    mode: "onTouched",
  });

  // Cálculo en vivo del monto a financiar (se actualiza mientras el usuario escribe).
  const precio = Number(watch("precioVenta")) || 0;
  const inicial = Number(watch("inicial")) || 0;
  const monto = montoAFinanciar({ precioVenta: precio, inicial });

  const onSubmit = async (datos: SolicitudData) => {
    setErrorEnvio(null);
    try {
      await solicitudesApi.crear(datos);
      mostrar("Solicitud creada correctamente", "exito");
      router.push("/");
    } catch (error) {
      setErrorEnvio(
        error instanceof Error ? error.message : "No se pudo crear la solicitud",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Campo label="Nombre del cliente" htmlFor="cliente" error={errors.cliente?.message}>
        <input
          id="cliente"
          className={campoInput(!!errors.cliente)}
          placeholder="Ej: Juan Pérez"
          {...register("cliente")}
        />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          label="Cédula"
          htmlFor="cedula"
          error={errors.cedula?.message}
          ayuda="Formato: V-12345678"
        >
          <input
            id="cedula"
            className={campoInput(!!errors.cedula)}
            placeholder="V-12345678"
            {...register("cedula")}
          />
        </Campo>

        <Campo label="Email" htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            className={campoInput(!!errors.email)}
            placeholder="cliente@correo.com"
            {...register("email")}
          />
        </Campo>
      </div>

      <Campo
        label="Vehículo (marca/modelo)"
        htmlFor="vehiculo"
        error={errors.vehiculo?.message}
      >
        <input
          id="vehiculo"
          className={campoInput(!!errors.vehiculo)}
          placeholder="Ej: Toyota Corolla"
          {...register("vehiculo")}
        />
      </Campo>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo
          label="Precio de venta (USD)"
          htmlFor="precioVenta"
          error={errors.precioVenta?.message}
        >
          <input
            id="precioVenta"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            className={campoInput(!!errors.precioVenta)}
            placeholder="20000"
            {...register("precioVenta")}
          />
        </Campo>

        <Campo label="Inicial (USD)" htmlFor="inicial" error={errors.inicial?.message}>
          <input
            id="inicial"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            className={campoInput(!!errors.inicial)}
            placeholder="5000"
            {...register("inicial")}
          />
        </Campo>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 dark:border-indigo-900 dark:bg-indigo-950/40">
        <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
          Monto a financiar
        </span>
        <span className="text-lg font-semibold text-indigo-700 tabular-nums dark:text-indigo-300">
          {formatearUSD(monto)}
        </span>
      </div>

      {errorEnvio && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          <CircleAlert className="h-4 w-4 shrink-0" />
          {errorEnvio}
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <Link href="/" className={botonSecundario}>
          Cancelar
        </Link>
        <button type="submit" className={botonPrimario} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Guardando…" : "Crear solicitud"}
        </button>
      </div>
    </form>
  );
}
