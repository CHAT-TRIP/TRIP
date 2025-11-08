import "../styles/globals.css";
import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import NavbarWrapper from "../components/NavbarWrapper";

// ====== FONTES ====== // 
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
      suppressHydrationWarning
    >
      <head>
        {/* Corrige zoom, vh e safe-area no iPhone */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </head>

      <body
        className="text-[#181818] font-montserrat antialiased"
        style={{
          minHeight: "100dvh", // previne bug do teclado no iOS
          backgroundColor: "transparent", // deixa cada página ter seu próprio fundo
        }}
      >
        {/* NAVBAR FIXA */}
        <NavbarWrapper />

        {/* CONTEÚDO DAS PÁGINAS */}
        <main>{children}</main>
      </body>
    </html>
  );
}
