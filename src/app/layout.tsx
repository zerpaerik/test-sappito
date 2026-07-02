import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrediApp — Solicitudes de crédito",
  description: "Mini-portal de solicitudes de crédito vehicular",
};

// Fija el tema antes del primer render para evitar parpadeo (flash) al cargar.
const scriptTema = `try{var t=localStorage.getItem('tema');if(t==='oscuro'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
        <ToastProvider>
          <Header />
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
