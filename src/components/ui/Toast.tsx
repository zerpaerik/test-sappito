"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

type TipoToast = "exito" | "error";

interface Toast {
  id: number;
  mensaje: string;
  tipo: TipoToast;
}

interface ToastContextValue {
  mostrar: (mensaje: string, tipo?: TipoToast) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DURACION_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const cerrar = useCallback((id: number) => {
    setToasts((previos) => previos.filter((toast) => toast.id !== id));
  }, []);

  const mostrar = useCallback(
    (mensaje: string, tipo: TipoToast = "exito") => {
      const id = Date.now() + Math.random();
      setToasts((previos) => [...previos, { id, mensaje, tipo }]);
      setTimeout(() => cerrar(id), DURACION_MS);
    },
    [cerrar],
  );

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onCerrar={() => cerrar(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onCerrar }: { toast: Toast; onCerrar: () => void }) {
  const esExito = toast.tipo === "exito";
  return (
    <div
      role="status"
      className={`flex animate-[toast-in_0.2s_ease-out] items-start gap-2 rounded-lg border p-3 shadow-lg ${
        esExito
          ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          : "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
      }`}
    >
      {esExito ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      ) : (
        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      )}
      <p className="flex-1 text-sm">{toast.mensaje}</p>
      <button
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar notificación"
        className="text-current/60 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return contexto;
}
