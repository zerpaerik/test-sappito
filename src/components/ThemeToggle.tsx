"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Alterna entre tema claro y oscuro añadiendo/quitando la clase `.dark`
 * en <html> y guarda la preferencia en localStorage. El tema inicial lo
 * fija un script en el layout para evitar parpadeo al cargar.
 */
export function ThemeToggle() {
  const [oscuro, setOscuro] = useState(false);

  useEffect(() => {
    setOscuro(document.documentElement.classList.contains("dark"));
  }, []);

  function alternar() {
    setOscuro((previo) => {
      const siguiente = !previo;
      document.documentElement.classList.toggle("dark", siguiente);
      try {
        localStorage.setItem("tema", siguiente ? "oscuro" : "claro");
      } catch {
        // localStorage puede no estar disponible; el toggle sigue funcionando.
      }
      return siguiente;
    });
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Cambiar tema"
      className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {oscuro ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
