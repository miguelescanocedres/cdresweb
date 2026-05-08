import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://cdresintec.com";

export const metadata: Metadata = {
  title: "CDRES INTEC — Soluciones Informáticas",
  description:
    "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida para empresas que quieren crecer sin fricción.",
  keywords: ["automatizaciones", "bots IA", "agentes inteligentes", "desarrollo web", "SaaS", "CDRES INTEC", "soluciones informáticas"],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "CDRES INTEC — Soluciones Informáticas",
    description:
      "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida para empresas que quieren crecer sin fricción.",
    siteName: "CDRES INTEC",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CDRES INTEC — Soluciones Informáticas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CDRES INTEC — Soluciones Informáticas",
    description:
      "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CDRES INTEC",
  url: siteUrl,
  description:
    "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida para empresas que quieren crecer sin fricción.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [],
  offers: {
    "@type": "Offer",
    description: "Automatización de procesos, desarrollo web, SaaS, bots con IA",
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#060B12]">{children}</body>
    </html>
  );
}
