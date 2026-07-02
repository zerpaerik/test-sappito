import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EstadoBadge } from "./EstadoBadge";
import { formatearUSD } from "@/lib/format";
import { montoAFinanciar, type Solicitud } from "@/lib/types";

export function SolicitudCard({ solicitud }: { solicitud: Solicitud }) {
  const financiar = montoAFinanciar(solicitud);

  return (
    <Link
      href={`/solicitud/${solicitud.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{solicitud.cliente}</h3>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {solicitud.vehiculo}
          </p>
        </div>
        <EstadoBadge estado={solicitud.estado} />
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Precio de venta</dt>
          <dd className="font-medium">{formatearUSD(solicitud.precioVenta)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Monto a financiar</dt>
          <dd className="font-medium text-indigo-600 dark:text-indigo-400">
            {formatearUSD(financiar)}
          </dd>
        </div>
      </dl>

      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        Ver detalle
        <ChevronRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
