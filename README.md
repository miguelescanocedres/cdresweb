# CDRES INTEC — Soluciones Informáticas

Web corporativa de CDRES INTEC. Sitio de alta performance con animaciones avanzadas, efectos visuales y diseño premium para una empresa de soluciones tecnológicas.

**URL Producción:** https://cdresintec.com  
**URL Staging:** https://cdresweb.vercel.app  
**Repositorio:** https://github.com/miguelescanocedres/cdresweb

---

## Stack Tecnológico

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 16.2.1 | React Framework con App Router |
| **Runtime** | React | 19.2.4 | UI library con server components |
| **Language** | TypeScript | 5.x | Type safety y developer experience |
| **Styling** | Tailwind CSS | 4.0 | Utility-first CSS framework |
| **Animations** | Framer Motion | 12.38.0 | React animation library |
| **Animations** | GSAP | 3.15.0 | JavaScript animation library |
| **Icons** | Lucide React | 0.577.0 | SVG icon library |
| **UI Components** | shadcn/ui | - | Headless component library |
| **Utils** | clsx | 2.1.1 | Conditional classNames |
| **Utils** | tailwind-merge | 3.5.0 | Merge conflicting Tailwind classes |

---

## Estructura del Proyecto

```
cdres-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout con metadata y fonts
│   │   ├── page.tsx             # Homepage que compone todas las secciones
│   │   └── globals.css          # Estilos globales, variables, animaciones
│   ├── components/
│   │   ├── Navbar.tsx           # Navegación fixed con logo animado
│   │   ├── HeroSplash.tsx       # Sección intro fullscreen con CDRES animado
│   │   ├── Hero.tsx             # Sección principal (si existe)
│   │   ├── Services.tsx         # Bento Grid de 5 servicios
│   │   ├── ParticleHero.tsx     # Sección con partículas formando palabras
│   │   ├── HowItWorks.tsx       # Proceso en pasos
│   │   ├── WhyCdres.tsx         # Diferenciadores y stats
│   │   ├── CTASection.tsx       # Call to action final
│   │   ├── Footer.tsx           # Footer con links y copyright
│   │   ├── WhatsAppWidget.tsx   # Widget flotante de WhatsApp
│   │   ├── SplashScreen.tsx     # Pantalla de carga (si existe)
│   │   └── ui/
│   │       ├── particle-text-effect.tsx      # Canvas con partículas formando texto
│   │       ├── particle-build-text.tsx       # Canvas alternativo (no usado)
│   │       ├── vapour-text-effect.tsx        # Efecto de vaporización (no usado)
│   │       ├── motion-footer.tsx             # Footer cinematic con GSAP (no usado)
│   │       ├── card.tsx                      # Componente Card base
│   │       ├── button.tsx                    # Componente Button base
│   │       ├── badge.tsx                     # Componente Badge
│   │       ├── separator.tsx                 # Componente Separator
│   │       └── navigation-menu.tsx           # Componente NavigationMenu
│   └── lib/
│       └── utils.ts             # Helper: cn() para merge de clases
├── public/
│   ├── og-image.png             # Open Graph image (1200x630)
│   └── ...otros assets
├── package.json
├── tsconfig.json
├── next.config.js               # Configuración de Next.js
└── tailwind.config.js           # Configuración de Tailwind
```

---

## Componentes Principales

### `HeroSplash` — Portada Animada
Sección fullscreen inicial con el logo CDRES INTEC letra a letra.

**Features:**
- Animación de entrada blur → focus con Framer Motion (staggered por letra)
- C en blanco, DRES en azul (#0066FF), INTEC en gris (#8892A4)
- Scroll-responsive: scale + opacity decreasing al bajar
- Gradient glow blobs en background (azul + cyan)
- Grid overlay fijo
- Scroll indicator con bounce animation
- RAF debounce en scroll para performance

**Código clave:**
```typescript
// Cada letra entra con delay diferente
[
  { char: "C", color: "#FFFFFF", shadow: "...", delay: 0 },
  { char: "D", color: "#0066FF", shadow: "...", delay: 0.22 },
  // ... resto de letras
].map(({ char, color, shadow, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.4, filter: "blur(32px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ color, textShadow: shadow }}
  >
    {char}
  </motion.span>
))
```

### `Services` — Bento Grid de 5 Servicios
Sección con grid asimétrico mostrando servicios con iconos y tags.

**Servicios:**
1. **Automatizaciones** — n8n, Make, Zapier, APIs (Azul #0066FF)
2. **Bots Inteligentes** — WhatsApp, Telegram, Web, IA (Cyan #00D4FF)
3. **Agentes de IA** — Claude, GPT-4, Langchain, MCP (Lavanda #B3C5FF)
4. **Desarrollo Web** — Next.js, React, Tailwind, Node (Emerald #00E479)
5. **SaaS a Medida** — SaaS, MVP, Escalable, Cloud (Naranja #FF8C6B)

**Features:**
- Viewport-based scroll animation (IntersectionObserver)
- Hover effects: scale + shadow + glow
- Tags con badges de tecnología
- Responsive: 1 columna mobile, 2-3 columnas tablet, 5 en desktop

### `ParticleHero` — Partículas Formando Texto
Sección con canvas que renderiza partículas animadas formando palabras.

**Palabras clave:** "Automatización", "Innovación", "Velocidad", "Escalabilidad"

**Features:**
- WebGL 2D Canvas optimizado
- Partículas en colores azules variados
- Sistema de detección de colisiones (opcional)
- Scroll parallax effect

### `Navbar` — Navegación Fija
Barra de navegación sticky con logo CDRES animado, links de navegación y menu responsive.

**Features:**
- Logo animado: cada letra entra con delay (C, DRES, INTEC)
- Glass morphism background al scroll (scrollY > 20px)
- Links internos con smooth scroll (#servicios, #proceso, #nosotros, #contacto)
- Menu mobile hamburger (ResponsiveMenu component)
- aria-expanded para accesibilidad

### `WhatsAppWidget` — Chat Flotante
Widget en esquina inferior derecha con panel de chat expandible.

**Features:**
- Botón flotante con WhatsApp icon (26px)
- Panel expandible con header (gradiente verde WhatsApp), mensaje, CTA
- Link directo a WhatsApp: `https://wa.me/59898331920?text=Hola...`
- Animaciones: expand/collapse con scale + opacity
- SVG icons (no emoji)
- Responsive

**Número:** +598 98 331 920 (Uruguay)

### `HowItWorks`, `WhyCdres`, `CTASection`, `Footer`
Secciones estándar con contenido corporativo. Revisar cada componente para detalles específicos.

---

## Branding & Design System

### Colores CDRES
```typescript
// Primarios
--color-cdres-blue: #0066FF      // Azul principal, logo DRES
--color-cdres-cyan: #00D4FF      // Cyan accent
--color-cdres-emerald: #00E479   // Emerald accent

// Superficies
--color-surface-low: #0E1525
--color-surface-mid: #111827
--color-surface-high: #1C2333
--color-surface-highest: #252D3F

// Fondo
--background: #060B12            // Dark navy
--foreground: #DEE1F7            // Light text
```

### Tipografía
```typescript
// Headings
font-family: Space Grotesk
weights: 400, 500, 600, 700
display: swap              // Font display strategy para performance

// Body
font-family: DM Sans
weights: 400, 500, 700
display: swap
```

### Utilidades CSS Personalizadas
```css
/* Gradientes */
.gradient-blue              /* linear-gradient(135deg, #0066FF, #00D4FF) */
.gradient-text              /* Gradient text clipping */
.gradient-text-animated     /* Gradient animado 6s */

/* Glow effects */
.glow-blue                  /* box-shadow azul */
.glow-emerald               /* box-shadow esmeralda */

/* Glass morphism */
.glass                      /* backdrop-filter blur + rgba background */
.glass-light                /* versión más clara */

/* Animaciones */
.animate-float              /* float vertical 5s */
.animate-float-x            /* float XY 7s */
.animate-morph              /* border-radius morph 9s */
.animate-orbit              /* rotate ring 3D 10s */
.animate-glow-pulse         /* glow + scale pulse 3s */
.animate-scroll-bounce      /* bounce indicator */
```

---

## SEO & Meta Tags

**Archivo:** `src/app/layout.tsx`

### Open Graph
```typescript
openGraph: {
  type: "website",
  title: "CDRES INTEC — Soluciones Informáticas",
  description: "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida...",
  images: [{ url: "/og-image.png", width: 1200, height: 630 }],
}
```

### Twitter Card
```typescript
twitter: {
  card: "summary_large_image",
  title: "CDRES INTEC — Soluciones Informáticas",
  description: "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida.",
  images: ["/og-image.png"],
}
```

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CDRES INTEC",
  "url": "https://cdresintec.com",
  "description": "Automatizaciones, bots con IA, agentes inteligentes, desarrollo web y SaaS a medida para empresas que quieren crecer sin fricción.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  }
}
```

---

## Configuración

### Environment Variables
Ninguna variable de entorno requerida en el build time. El proyecto es estático (SSG).

### next.config.js
```typescript
// Imagen optimization, compression, etc.
// Revisar archivo en la raíz del proyecto
```

### Fonts
- **Space Grotesk** (headings) — cargado vía `next/font/google` con `display: swap`
- **DM Sans** (body) — cargado vía `next/font/google` con `display: swap`

---

## Desarrollo Local

### Requisitos
- Node.js 18+ (recomendado 20)
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/miguelescanocedres/cdresweb.git
cd cdres-web

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Abrir en navegador
# http://localhost:3000
```

### Comandos
```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build optimizado para producción
npm start        # Servir build en local
npm run lint     # ESLint (Next.js + TypeScript)
```

### Development Workflow
1. **Rama de feature:** Trabajar en rama dedicada (ej: `agenda`, `new-section`)
2. **Testing local:** Verificar en Chrome, Firefox, Safari y mobile
3. **Build test:** `npm run build` antes de push
4. **Merge a main:** Al finalizar la rama, merge a `main`
5. **Deploy:** Vercel se redeploya automáticamente al push a `main`

---

## Deployment

### Vercel (Recomendado)
El proyecto está conectado a Vercel. Cada push a `main` redeploya automáticamente.

**URLs:**
- **Staging:** `cdresweb.vercel.app` (rama `main`)
- **Producción:** `cdresintec.com` (dominio personalizado, apunta a Vercel)

**Proceso:**
```bash
# 1. Merge rama a main
git checkout main
git merge nombre-rama
git push origin main

# 2. Vercel detecta push automáticamente
# 3. Build inicia (1-2 minutos)
# 4. Deploy a producción

# 5. Verificar deployment
# https://cdresintec.com
```

### Build Output
```
.next/
├── .env.local         # Variables de entorno (si existen)
├── out/               # HTML estático pre-renderizado (si SSG)
└── static/            # Assets compilados
```

---

## Performance

### Optimizaciones Implementadas

1. **Font Display Strategy**
   - `display: swap` en Space Grotesk y DM Sans
   - Evita FOIT (Flash of Invisible Text)

2. **Image Optimization**
   - Next.js Image component para OG image
   - WebP format auto-negotiation

3. **Bundle Size**
   - Tree-shaking automático de Next.js
   - Tailwind CSS purging de clases no usadas
   - Code splitting por ruta

4. **Animation Performance**
   - RAF debounce en scroll handlers (HeroSplash)
   - `will-change: transform, opacity` en elementos animados
   - `pointer-events: none` en decorativos
   - Canvas rendering en ParticleHero (WebGL 2D)

5. **CSS**
   - Utility-first con Tailwind v4 (CSS-in-JS minimal)
   - Custom variables para temas (#060B12 background, colores CDRES)

6. **Interactivity**
   - Framer Motion para animations (GPU-accelerated)
   - GSAP opcional para efectos complejos (lazy-loaded)

### Métricas (Target)
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s

---

## Accesibilidad (a11y)

### Implementado
- **Keyboard Navigation:** Focus outlines visibles (#0066FF, 2px)
- **ARIA Labels:**
  - `aria-label` en botones de acción (WhatsApp widget, navbar toggle)
  - `aria-expanded` en navbar mobile menu
  - `aria-label` en secciones main
- **Semantic HTML:** `<section>`, `<nav>`, `<main>`, `<footer>`
- **SVG Icons:** `<svg aria-hidden="true">` en decorativos

### No Implementado (Si necesario)
- Screen reader testing
- Color contrast audit (actualmente cumple WCAG AA)

---

## Assets & Recursos

### Imágenes Públicas
```
public/
├── og-image.png         # 1200x630px para OpenGraph/Twitter
└── ... otros assets
```

### Íconos
- **Heroicons / Lucide React:** SVG inline en componentes
- **WhatsApp Icon:** SVG personalizado en WhatsAppWidget
- **Custom Icons:** En Services (Automatizaciones, Bots, etc.)

---

## Troubleshooting

### Build Fallido
```bash
# 1. Verificar dependencias
npm list

# 2. Limpiar caché
rm -rf .next node_modules
npm install

# 3. Build de nuevo
npm run build
```

### Performance Lento en Dev
```bash
# 1. Usar modo turbopack (si Next.js >= 13.1)
npm run dev -- --turbopack

# 2. Deshabilitar sourcemaps en desarrollo
# next.config.js → productionBrowserSourceMaps: false
```

### Animaciones Entrecortadas (Jank)
1. Verificar DevTools → Performance
2. Buscar layout shifts (CLS)
3. Reducir complejidad de canvas en ParticleHero
4. Usar Chrome DevTools → Rendering → paint flashing

---

## Contribuciones

### Convencion de Commits
```
<type>: <description>

<optional body>
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

### Code Style
- **TypeScript:** Types explícitos en APIs públicas
- **Componentes:** Props interface nombrada
- **Funciones:** Max 50 líneas, max 800 líneas/archivo
- **Naming:** camelCase (funciones, variables), PascalCase (componentes)
- **No hardcoding:** Usar variables CSS o constantes

---

## Futuras Mejoras

1. **Modo Oscuro/Claro:** Toggle theme (actualmente solo dark)
2. **Internacionalización (i18n):** Soporte para múltiples idiomas
3. **Blog:** Integración con CMS (Contentful, Sanity)
4. **Contacto Dinámico:** Formulario con backend (Resend, SendGrid)
5. **Analytics:** Integración con Vercel Analytics o Plausible
6. **E2E Tests:** Playwright para flujos críticos

---

## Licencia

Privado. Propiedad de CDRES INTEC.

---

## Contacto

**Email:** miguelescano@gmail.com  
**WhatsApp:** +598 98 331 920  
**Sitio:** https://cdresintec.com
