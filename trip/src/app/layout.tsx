import "../styles/globals.css";
import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";

// Títulos
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

// Texto geral
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRIP | CCR",
  description: "Assistente virtual da CCR para transporte ferroviário",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head />
      {/* Montserrat como base do site; Unbounded para usar via classe */}
      <body
        className={`${unbounded.variable} ${montserrat.variable} font-montserrat bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
