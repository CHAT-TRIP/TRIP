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
    icon: "/favicon.ico",          // ícone padrão
    shortcut: "/favicon.ico",      // atalho (browser)
    apple: "/favicon.png",         // para iPhone/iPad
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
      <body
        className="text-[#181818] font-montserrat antialiased"
        style={{ backgroundColor: "#E9E9E9", minHeight: "100vh" }}
      >
        {/* NAVBAR FIXO E FLUTUANTE */}
        <Navbar />

        {/* CONTEÚDO DAS PÁGINAS */}
        <main>{children}</main>
      </body>
    </html>
  );
}
