# CDRES INTEC — Arquitectura & Codemaps

**Last Updated:** 2026-05-07

---

## Visión General

CDRES INTEC es un sitio corporativo estático Next.js 16 con React 19 y TypeScript. Enfoque en performance, animaciones avanzadas y experiencia visual premium.

**Características:**
- Static Site Generation (SSG) — sin servidor backend
- Server Components (App Router) — zero JavaScript overhead donde sea posible
- Client Components (`"use client"`) — solo donde se necesite interactividad
- Tailwind CSS v4 — utility-first styling
- Framer Motion + GSAP — animaciones GPU-accelerated

---

## Árbol de Componentes

```
App (layout.tsx)
├── Navbar
│   ├── Logo (CDRES INTEC animated)
│   ├── NavLinks (servicios, proceso, nosotros, contacto)
│   └── MobileMenu (hamburger toggle)
├── Main (page.tsx)
│   ├── HeroSplash
│   │   ├── CDRES letters (staggered animation)
│   │   ├── INTEC sub-brand
│   │   ├── Tagline
│   │   ├── Scroll indicator
│   │   └── Background (glow blobs + grid)
│   ├── Services
│   │   ├── Bento Grid (5 cards)
│   │   │   ├── Icon (SVG)
│   │   │   ├── Title
│   │   │   ├── Description
│   │   │   └── Tags (badges)
│   │   └── Viewport animation
│   ├── ParticleHero
│   │   ├── Canvas (WebGL 2D)
│   │   └── Particle system
│   ├── HowItWorks
│   │   ├── Step 1-5
│   │   ├── Icons
│   │   └── Timeline
│   ├── WhyCdres
│   │   ├── Diferenciadores
│   │   ├── Stats cards
│   │   └── Feature list
│   ├── CTASection
│   │   ├── Headline
│   │   ├── CTA button
│   │   └── Background decoration
│   └── Footer
│       ├── Logo
│       ├── Links (services, about, contact)
│       ├── Social (si existe)
│       └── Copyright
└── WhatsAppWidget
    ├── Floating button
    └── Chat panel
        ├── Header (CDRES)
        ├── Message
        └── CTA (WhatsApp link)
```

---

## Componentes Detallados

### `HeroSplash.tsx` (194 lines)
**Responsable de:** Portada fullscreen animada

**State:**
- `containerRef` — referencia al contenedor scroll-responsive

**Effects:**
- Scroll listener con RAF debounce
- Scale + opacity effect al scroll

**Rendering:**
- 5 letras (C, D, R, E, S) en Framer Motion con delays
- INTEC sub-brand con líneas decorativas
- Tagline "Soluciones Informáticas"
- Scroll indicator bounce

**Performance:**
- RAF debounce previene jank
- `willChange: transform, opacity`
- `pointer-events: none` en decorativos

---

### `Services.tsx` (~130 lines)
**Responsable de:** Grid de 5 servicios

**Data:**
```typescript
services = [
  {
    icon: SVG,
    title: string,
    description: string,
    tags: string[],
    accent: hex color,
    accentRgb: rgb(a,b,c)
  }
]
```

**Animaciones:**
- Viewport-based (IntersectionObserver)
- Card stagger entrada
- Hover: scale(1.05) + shadow glow
- Tag badges con color accent

**Responsive:**
- Mobile: 1 columna
- Tablet: 2-3 columnas
- Desktop: 5 columnas (Bento Grid)

---

### `ParticleHero.tsx`
**Responsable de:** Sección con canvas de partículas

**Features:**
- Canvas 2D context
- Particle system (generación, actualización, render)
- Palabras clave animadas
- Colores azules variados

**Performance:**
- requestAnimationFrame loop
- Pruned particles (off-screen cleanup)
- Optional collision detection

---

### `Navbar.tsx` (~100 lines)
**Responsable de:** Navegación sticky

**State:**
- `scrolled` — boolean, activa glass morphism
- `menuOpen` — boolean, toggle mobile menu

**Effects:**
- Scroll listener en mount/unmount

**Features:**
- Logo con stagger animation (C → DRES → INTEC)
- Navigation links (smooth scroll via anchor)
- Mobile hamburger menu con aria-expanded
- Glass background al scroll (scrollY > 20px)

---

### `WhatsAppWidget.tsx` (166 lines)
**Responsable de:** Chat flotante WhatsApp

**State:**
- `open` — boolean, panel expandido

**Data:**
```typescript
WA_NUMBER = "59898331920"
WA_MESSAGE = "Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios"
WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`
```

**Rendering:**
- Floating button (fixed bottom-right)
- Chat panel (AnimatePresence con Framer Motion)
- Header (gradiente verde WhatsApp)
- Message bubble
- CTA link (abre WhatsApp)

**Animaciones:**
- Button: whileHover scale(1.08), whileTap scale(0.95)
- Panel: expand/collapse con scale + opacity
- Icons: rotate transition on open/close

---

### `Footer.tsx`, `CTASection.tsx`, `HowItWorks.tsx`, `WhyCdres.tsx`
Componentes estándar con contenido corporativo. Ver archivos respectivos para detalles.

---

## Data Flow & Architecture

```
Page.tsx (server component)
  ↓
  Compone orden de secciones:
  1. Navbar
  2. HeroSplash
  3. Services
  4. ParticleHero
  5. HowItWorks
  6. WhyCdres
  7. CTASection
  8. Footer
  9. WhatsAppWidget

Cada componente es "use client":
  - Maneja su propio scroll/hover state
  - Animations con Framer Motion / GSAP
  - No hay prop drilling (datos inline)
  - No hay global state manager (Zustand, Redux, etc.)

Assets estáticos:
  - /public/og-image.png (SEO)
  - Fonts vía next/font/google (Space Grotesk, DM Sans)
  - SVG icons inline en componentes
```

---

## Styling Strategy

### CSS Layers (Tailwind CSS v4)

```
@layer base          → HTML reset, font setup
@layer components    → Reusable component utilities
@layer utilities     → Custom utilities (.glass, .gradient-text, etc.)

Custom variables:
--font-heading       → Space Grotesk
--font-sans          → DM Sans
--color-cdres-blue   → #0066FF
--color-cdres-cyan   → #00D4FF
--color-cdres-emerald → #00E479
--background         → #060B12
```

### Utility Classes

```css
/* Gradientes */
.gradient-blue              /* 135deg: #0066FF → #00D4FF */
.gradient-text              /* Text clipping gradient */
.gradient-text-animated     /* 6s rotating gradient */

/* Glow effects */
.glow-blue                  /* box-shadow azul */
.glow-emerald               /* box-shadow esmeralda */

/* Glass morphism */
.glass                      /* backdrop-filter blur(16px) + rgba bg */
.glass-light                /* blur(12px) + rgba más claro */

/* Animaciones predefinidas */
.animate-float              /* translateY ±10px, 5s loop */
.animate-float-x            /* XY transform, 7s */
.animate-morph              /* border-radius morph, 9s */
.animate-orbit              /* 3D rotation, 10s */
.animate-glow-pulse         /* scale + opacity, 3s */
.animate-scroll-bounce      /* scroll indicator, 1.5s */
```

---

## Performance Optimizations

### 1. Font Loading Strategy
```typescript
// Space Grotesk (headings)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"          // Crucial: evita FOIT
});
```
- `display: swap` muestra fallback font mientras carga
- Reduces LCP impact

### 2. Image Optimization
- Next.js `Image` component auto-optimizes
- OG image precompressed (1200x630)

### 3. Bundle Size
- Tree-shaking automático en Next.js
- Tailwind v4 purgea clases no usadas
- Code splitting per-route

### 4. Animation Performance
- RAF debounce en HeroSplash scroll
- Framer Motion GPU-accelerated (transform + opacity)
- GSAP para efectos complejos (lazy-load si es necesario)
- Canvas 2D en ParticleHero (WebGL light)

### 5. Component Optimization
- "use client" solo donde se necesita interactividad
- Aria attributes no ralentizan render
- SVG icons inline (no HTTP requests)

---

## Accesibilidad (a11y)

### Keyboard Navigation
```typescript
// Focus outline visible
:focus-visible {
  outline: 2px solid #0066FF;
  outline-offset: 3px;
}
```

### ARIA
```typescript
// WhatsAppWidget
<button aria-label="Abrir chat de WhatsApp">
<button aria-label="Cerrar chat">

// Navbar mobile
<button aria-expanded={menuOpen}>Menu</button>

// Secciones
<section aria-label="CDRES INTEC — Soluciones Informáticas">
```

### Semantic HTML
```typescript
<nav>                     // Navbar
<main>                    // Secciones
<section>                 // Cada área principal
<footer>                  // Footer
<svg aria-hidden="true">  // Decorativos
```

---

## SEO Implementation

### Meta Tags (layout.tsx)
```typescript
export const metadata: Metadata = {
  title: "CDRES INTEC — Soluciones Informáticas",
  description: "Automatizaciones, bots con IA...",
  keywords: ["automatizaciones", "bots IA", "desarrollo web", "SaaS"],
  metadataBase: new URL("https://cdresintec.com"),
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
  alternates: { canonical: "https://cdresintec.com" }
};
```

### JSON-LD Schema
```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CDRES INTEC",
  "url": "https://cdresintec.com",
  "description": "...",
  "contactPoint": { /* ... */ }
};
```

---

## File Size Analysis

```
src/app/layout.tsx             97 lines  (~2.8 KB)
src/app/page.tsx               28 lines  (~0.8 KB)
src/components/HeroSplash.tsx  194 lines (~5.5 KB)
src/components/Services.tsx    ~130 lines (~4.2 KB)
src/components/Navbar.tsx      ~100 lines (~3.2 KB)
src/components/WhatsAppWidget  166 lines (~5.1 KB)
src/app/globals.css            234 lines (~8.2 KB)
```

**Total:** ~1,100 lines código fuente + CSS

---

## Deployment Pipeline

```
Local Development
  ↓ npm run build
Build Optimization
  ↓ git push origin main
GitHub Repository
  ↓ Webhook trigger
Vercel Build System
  ↓ next build
Next.js Compilation
  ↓ next export (si SSG)
Static Output (.next/out)
  ↓ CDN push
Vercel Edge Network
  ↓ DNS (cdresintec.com)
Production Live
```

---

## Configuración Importante

### next.config.js
Ver archivo raíz para:
- Image optimization
- Compression
- Custom webpack config

### tailwind.config.js
Ver archivo raíz para:
- Custom theme
- Extended utilities
- Plugin configuration

### tsconfig.json
```typescript
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Path alias
    }
  }
}
```

---

## Futuro / Roadmap

**Próximas mejoras documentadas:**

1. **Modo Oscuro/Claro** — toggle theme (actualmente solo dark)
2. **i18n** — soporte multiidioma
3. **Blog** — CMS integrado
4. **Formulario de Contacto** — backend (Resend, SendGrid)
5. **Analytics** — Vercel Analytics o Plausible
6. **E2E Tests** — Playwright test suite

---

## Referencias

- **Next.js 16:** https://nextjs.org/docs
- **React 19:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Tailwind CSS v4:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion
- **GSAP:** https://gsap.com
