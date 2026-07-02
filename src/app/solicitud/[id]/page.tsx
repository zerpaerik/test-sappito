"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { EstadoBadge } from "@/components/EstadoBadge";
import { botonSecundario } from "@/components/ui/estilos";
import { useSolicitud } from "@/hooks/useSolicitud";
import { formatearUSD } from "@/lib/format";
import { montoAFinanciar, type Solicitud } from "@/lib/types";

export default function DetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { solicitud, cargando, error } = useSolicitud(id);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al listado
      </Link>

      {cargando ? (
        <DetalleCargando />
      ) : error || !solicitud ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <TriangleAlert className="h-8 w-8 text-zinc-400" />
          <p className="font-medium">{error ?? "Solicitud no encontrada"}</p>
          <Link href="/" className={botonSecundario}>
            Volver al listado
          </Link>
        </div>
      ) : (
        <Detalle solicitud={solicitud} />
      )}
    </div>
  );
}

function Detalle({ solicitud }: { solicitud: Solicitud }) {
  return (
    <article className="animate-[fade-in_0.3s_ease-out] rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {solicitud.cliente}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {solicitud.vehiculo}
          </p>
        </div>
        <EstadoBadge estado={solicitud.estado} />
      </div>

      <dl className="mt-6 divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
        <Fila etiqueta="Cédula" valor={solicitud.cedula} />
        <Fila etiqueta="Email" valor={solicitud.email} />
        <Fila etiqueta="Vehículo" valor={solicitud.vehiculo} />
        <Fila etiqueta="Precio de venta" valor={formatearUSD(solicitud.precioVenta)} />
        <Fila etiqueta="Inicial" valor={formatearUSD(solicitud.inicial)} />
      </dl>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-red-50 px-4 py-3 dark:bg-red-950/40">
        <span className="text-sm font-medium text-red-900 dark:text-red-200">
          Monto a financiar
        </span>
        <span className="text-xl font-semibold text-red-700 tabular-nums dark:text-red-300">
          {formatearUSD(montoAFinanciar(solicitud))}
        </span>
      </div>
    </article>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-zinc-500 dark:text-zinc-400">{etiqueta}</dt>
      <dd className="font-medium">{valor}</dd>
    </div>
  );
}

function DetalleCargando() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-5 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-6 space-y-3">
        {Array.from({ length: 5 }).map((_, indice) => (
          <div key={indice} className="h-5 rounded bg-zinc-200 dark:bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}
