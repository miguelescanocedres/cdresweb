import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Cdres — Soluciones Informáticas",
  description:
    "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida para empresas que quieren crecer sin fricción.",
  keywords: ["automatizaciones", "bots IA", "agentes", "desarrollo web", "SaaS", "Cdres"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#060B12]">{children}</body>
    </html>
  );
}
