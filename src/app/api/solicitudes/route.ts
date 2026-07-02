import { NextResponse } from "next/server";
import { solicitudSchema } from "@/lib/schema";
import { crearSolicitud, listarSolicitudes } from "@/lib/store";

// El almacén es mutable, así que la respuesta nunca debe cachearse.
export const dynamic = "force-dynamic";

/** GET /api/solicitudes — devuelve todas las solicitudes. */
export async function GET() {
  return NextResponse.json(listarSolicitudes());
}

/** POST /api/solicitudes — crea una solicitud nueva (estado "Borrador"). */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El cuerpo de la petición no es JSON válido" },
      { status: 400 },
    );
  }

  // Se valida con el mismo esquema que usa el formulario.
  const resultado = solicitudSchema.safeParse(body);
  if (!resultado.success) {
    return NextResponse.json(
      {
        error: "Datos inválidos",
        detalles: resultado.error.issues.map((issue) => ({
          campo: issue.path.join("."),
          mensaje: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const nueva = crearSolicitud(resultado.data);
  return NextResponse.json(nueva, { status: 201 });
}
