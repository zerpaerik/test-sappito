import { NextResponse } from "next/server";
import { obtenerSolicitud } from "@/lib/store";

export const dynamic = "force-dynamic";

/** GET /api/solicitudes/:id — devuelve una solicitud por su id. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const solicitud = obtenerSolicitud(id);

  if (!solicitud) {
    return NextResponse.json(
      { error: "Solicitud no encontrada" },
      { status: 404 },
    );
  }

  return NextResponse.json(solicitud);
}
