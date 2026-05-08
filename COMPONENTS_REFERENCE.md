# CDRES INTEC — Components Reference

Referencia detallada de cada componente del proyecto.

**Última actualización:** 2026-05-07

---

## Componentes Principales

### 1. HeroSplash.tsx
**Ubicación:** `src/components/HeroSplash.tsx`  
**Líneas:** 194  
**Cliente:** Sí (`"use client"`)

**Propósito:** Sección fullscreen inicial con logo CDRES INTEC animado letra a letra.

**Props:** Ninguno

**Estado:**
- `containerRef` — referencia al contenedor para scroll-responsive effect

**Efectos:**
- Scroll listener con RAF debounce
- Scale + opacity decrease al scroll

**Elementos Clave:**
```typescript
// Logo letters
[C (white), D, R, E, S (all #0066FF)]
// INTEC sub-brand (#8892A4)
// Tagline "Soluciones Informáticas"
// Scroll indicator con bounce animation
// Background: grid overlay + glow blobs (azul + cyan)
```

**Animaciones Framer Motion:**
- Initial: `opacity: 0, scale: 0.4, filter: "blur(32px)"`
- Animate: `opacity: 1, scale: 1, filter: "blur(0px)"`
- Duration: 1.1s con delays staggered (0, 0.22, 0.44, 0.66, 0.88)
- Ease: `[0.16, 1, 0.3, 1]` (expo out)

**CSS Classes:**
- `animate-glow-pulse` — glow blobs
- `animate-scroll-bounce` — scroll indicator
- `bg-grid` — grid overlay

**Performance:**
- RAF debounce en scroll
- `willChange: transform, opacity`
- `pointer-events: none` en decorativos

---

### 2. Services.tsx
**Ubicación:** `src/components/Services.tsx`  
**Líneas:** ~130  
**Cliente:** Sí (`"use client"`)

**Propósito:** Bento Grid con 5 servicios principales.

**Props:** Ninguno

**Data:**
```typescript
const services = [
  {
    icon: SVG,
    title: string,
    description: string,
    tags: ["tech1", "tech2"],
    accent: hex color,
    accentRgb: "r,g,b"
  }
]

// 5 servicios:
// 1. Automatizaciones (Azul #0066FF)
// 2. Bots Inteligentes (Cyan #00D4FF)
// 3. Agentes de IA (Lavanda #B3C5FF)
// 4. Desarrollo Web (Emerald #00E479)
// 5. SaaS a Medida (Naranja #FF8C6B)
```

**Animaciones:**
- Viewport-based (IntersectionObserver)
- Card stagger entrada (staggerChildren)
- Hover: `scale(1.05)` + shadow glow
- Tag badges con color accent

**Responsive:**
```css
mobile:    grid-cols-1
sm:        grid-cols-2
md:        grid-cols-3
lg:        grid-cols-5
```

**CSS Classes:**
- `.card` — shadcn/ui base
- `.glow-blue`, `.glow-emerald` — hover glow

---

### 3. ParticleHero.tsx
**Ubicación:** `src/components/ParticleHero.tsx`  
**Líneas:** variable  
**Cliente:** Sí (`"use client"`)

**Propósito:** Canvas con partículas animadas formando palabras.

**Features:**
- Canvas 2D context (WebGL light)
- Particle system (create, update, render, delete)
- Palabras clave: "Automatización", "Innovación", "Velocidad", "Escalabilidad"
- Colores azules variados

**Performance:**
- requestAnimationFrame loop
- Particle pruning (off-screen cleanup)
- Optional: collision detection

**API Canvas:**
```typescript
ctx.clearRect(0, 0, width, height)
ctx.fillStyle = color
ctx.fillRect(x, y, size, size)
ctx.globalAlpha = opacity
```

---

### 4. Navbar.tsx
**Ubicación:** `src/components/Navbar.tsx`  
**Líneas:** ~100  
**Cliente:** Sí (`"use client"`)

**Propósito:** Navegación sticky con logo animado y menu responsive.

**Props:** Ninguno

**Estado:**
- `scrolled` (boolean) — activa glass morphism al scroll
- `menuOpen` (boolean) — toggle mobile menu

**Efectos:**
- Scroll listener en mount
- Cleanup en unmount

**Elementos:**
- Logo: C (blanco) + DRES (#0066FF) + INTEC (#8892A4)
- NavLinks: Servicios, Proceso, Nosotros, Contacto
- Mobile hamburger menu
- Glass background al scroll (scrollY > 20px)

**Animaciones:**
- Logo letters stagger entrada
- Menu dropdown slide
- Glass transition smooth 500ms

**CSS Classes:**
- `.glass` — backdrop-filter blur
- `.border-white/5` — subtle border

**Accesibilidad:**
- `aria-expanded` en mobile menu button
- `aria-label` descriptivos

---

### 5. WhatsAppWidget.tsx
**Ubicación:** `src/components/WhatsAppWidget.tsx`  
**Líneas:** 166  
**Cliente:** Sí (`"use client"`)

**Propósito:** Widget flotante de WhatsApp con chat expandible.

**Props:** Ninguno

**Estado:**
- `open` (boolean) — panel expandido/colapsado

**Data:**
```typescript
WA_NUMBER = "59898331920"
WA_MESSAGE = "Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios"
WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`
```

**Elementos:**
- Floating button (fixed bottom-right, z-100)
- Chat panel (expandible con AnimatePresence)
  - Header: avatar + "Cdres" + "En línea"
  - Body: mensaje + timestamp
  - CTA: "Iniciar conversación" (link a WhatsApp)
- Botón cierre (X)

**Animaciones Framer Motion:**
- Button: `whileHover={{ scale: 1.08 }}`, `whileTap={{ scale: 0.95 }}`
- Panel: `initial={{ opacity: 0, y: 16, scale: 0.95 }}`, `animate={{ opacity: 1, y: 0, scale: 1 }}`
- Icons: rotate transition on toggle

**Colores:**
- Button: gradiente verde WhatsApp (#128C7E → #25D366)
- Header: mismo gradiente
- Text: blanco (#FFFFFF)

**Accesibilidad:**
- `aria-label` en botones
- SVG icons (no emoji)

---

### 6. HowItWorks.tsx
**Ubicación:** `src/components/HowItWorks.tsx`  
**Líneas:** variable  
**Cliente:** Posiblemente sí

**Propósito:** Mostrar proceso en pasos.

**Elementos:**
- Step 1-5 (o cantidad según contenido)
- Icons por paso
- Timeline (opcional)

---

### 7. WhyCdres.tsx
**Ubicación:** `src/components/WhyCdres.tsx`  
**Líneas:** variable  
**Cliente:** Posiblemente sí

**Propósito:** Diferenciadores y stats.

**Elementos:**
- Feature list
- Statistics cards
- Diferenciadores únicos

---

### 8. CTASection.tsx
**Ubicación:** `src/components/CTASection.tsx`  
**Líneas:** variable  
**Cliente:** Posiblemente sí

**Propósito:** Call to action final.

**Elementos:**
- Headline
- CTA button
- Background decoration
- Optional: form fields

---

### 9. Footer.tsx
**Ubicación:** `src/components/Footer.tsx`  
**Líneas:** variable  
**Cliente:** Posiblemente no (`Server Component` por defecto)

**Propósito:** Pie de página.

**Elementos:**
- Logo CDRES
- Links (Services, About, Contact)
- Social media (si existe)
- Copyright
- Quick links

---

## Componentes UI (shadcn/ui)

### card.tsx
```typescript
interface CardProps {
  className?: string
}

export function Card({ ... }: CardProps)
// <Card><Card.Header>...</Card.Header>...</Card>
```

### button.tsx
```typescript
// <Button variant="outline" size="lg">Click</Button>
```

### badge.tsx
```typescript
// <Badge variant="secondary">Tag</Badge>
```

### separator.tsx
```typescript
// <Separator /> — horizontal line
```

### navigation-menu.tsx
```typescript
// <NavigationMenu>...<NavigationMenuItem>...</NavigationMenu>
```

---

## Root Layout

### layout.tsx
**Ubicación:** `src/app/layout.tsx`  
**Líneas:** 98  
**Tipo:** Server Component (default)

**Responsabilidades:**
1. Metadata global (title, description, OG, Twitter, JSON-LD)
2. Font loading (Space Grotesk, DM Sans)
3. HTML structure (lang="es")
4. CSS imports (globals.css)

**Fonts:**
```typescript
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"  // Crucial para performance
})

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap"
})
```

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: "CDRES INTEC — Soluciones Informáticas",
  description: "Automatizaciones, bots con IA...",
  keywords: [...],
  metadataBase: new URL("https://cdresintec.com"),
  openGraph: {
    type: "website",
    url: "https://cdresintec.com",
    title: "...",
    description: "...",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://cdresintec.com"
  }
}
```

---

## Home Page

### page.tsx
**Ubicación:** `src/app/page.tsx`  
**Líneas:** 28  
**Tipo:** Server Component (default)

**Responsabilidades:**
- Componer orden de secciones
- Importar componentes

**Orden:**
```typescript
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSplash />
        <Services />
        <ParticleHero />
        <HowItWorks />
        <WhyCdres />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
```

---

## Global Styles

### globals.css
**Ubicación:** `src/app/globals.css`  
**Líneas:** 234

**Contiene:**
1. Imports: Tailwind, tw-animate-css, shadcn/tailwind
2. Custom theme variables (colores, fonts, spacing)
3. Root CSS custom properties (--background, --foreground, etc.)
4. Base layer styles (*, body, html)
5. Utilities layer (.glass, .gradient-text, .animate-*)
6. Keyframes (pulse, float, morph, orbit, gradient-shift)
7. Focus visible styles (keyboard navigation)
8. Media queries (mobile responsive fixes)

**Custom Variables:**
```css
@theme inline {
  --color-cdres-blue: #0066FF
  --color-cdres-cyan: #00D4FF
  --color-cdres-emerald: #00E479
  --color-surface-low: #0E1525
  --color-surface-mid: #111827
  --color-surface-high: #1C2333
  --color-surface-highest: #252D3F
  --font-heading: var(--font-heading)
  --font-sans: var(--font-sans)
}
```

---

## Utilidades

### utils.ts
**Ubicación:** `src/lib/utils.ts`  
**Líneas:** 6

**Exporta:**
```typescript
export function cn(...inputs: ClassValue[]): string
// Merge Tailwind classes con prioridad correcta
// Usa clsx + tailwind-merge para evitar conflictos

// Ejemplo:
cn("px-4", "px-6")  // → "px-6" (último gana)
```

---

## Componentes NO Usados (Cleanup)

```typescript
// src/components/ui/particle-build-text.tsx    — no usado
// src/components/ui/vapour-text-effect.tsx     — no usado
// src/components/ui/motion-footer.tsx          — no usado
// src/components/SplashScreen.tsx              — no usado
// src/components/Hero.tsx                      — posiblemente no usado
```

**Acción:** Considerar eliminar para reducir tamaño repo.

---

## Componentes Propuestos (No Implementados)

### Formulario de Contacto
```typescript
// Agregar en CTASection o nueva sección
interface ContactFormProps {
  onSubmit: (data: ContactData) => Promise<void>
}
```

### Blog Post Component
```typescript
// Si se agrega blog (CMS integrado)
interface BlogPostProps {
  slug: string
  title: string
  content: string
  date: string
}
```

### Modal/Dialog
```typescript
// Para confirmaciones, lightbox, etc.
// Usar shadcn/ui Dialog component
```

---

## Props Convención

**Todos los componentes siguen este patrón:**

```typescript
interface ComponentNameProps {
  // Props requeridas
  title: string
  
  // Props opcionales con defaults
  className?: string
  
  // Callbacks
  onAction?: (value: string) => void
  
  // Data structures
  items?: Item[]
}

export function ComponentName(props: ComponentNameProps) {
  // ...
}
```

---

## Testing Recomendaciones

### Unit Tests (Vitest/Jest)
```typescript
// test/components/HeroSplash.test.tsx
describe("HeroSplash", () => {
  it("renders all letters", () => {
    // ...
  })
  
  it("applies scroll scale effect", () => {
    // ...
  })
})
```

### E2E Tests (Playwright)
```typescript
// e2e/homepage.spec.ts
test("hero splash visible and animates on scroll", async ({ page }) => {
  await page.goto("/")
  // assert visibility
  // scroll & assert scale change
})
```

---

## Migration Checklist (Si cambias algo)

- [ ] Componente compila sin errores TypeScript
- [ ] Componente se importa correctamente en page.tsx
- [ ] Props están tipadas
- [ ] Animaciones funcionan smooth (DevTools → Performance)
- [ ] Responsive en mobile (DevTools device emulation)
- [ ] Accesibilidad: focus outlines, aria-labels
- [ ] No hay console.log en producción
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`

---

**Última actualización:** 2026-05-07
