import "../styles/globals.css";
import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import Navbar from "../components/Navbar";

// ====== FONTES ======
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// ====== METADATA ======
export const metadata: Metadata = {
  title: "TRIP | CCR",
  description: "Assistente virtual da CCR para transporte ferroviário",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

// ====== LAYOUT PRINCIPAL ======
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${unbounded.variable} ${montserrat.variable}`}
      style={{ backgroundColor: "#E9E9E9" }}
    >
      <head>
        {/* evita zoom ao focar, usa área segura do notch, e melhora altura no iOS */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
        />
        {/* Se quiser bloquear pinch-zoom totalmente (menos acessível):
            content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no, maximum-scale=1"
        */}
      </head>
      <body
        className="text-[#181818] font-montserrat antialiased"
        style={{ backgroundColor: "#E9E9E9", minHeight: "100vh" }}
      >
        {/* NAVBAR FIXO */}
        <Navbar />

        {/* CONTEÚDO DAS PÁGINAS */}
        <main>{children}</main>
      </body>
    </html>
  );
}
