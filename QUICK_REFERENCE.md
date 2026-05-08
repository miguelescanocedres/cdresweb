# CDRES INTEC — Quick Reference

Consulta rápida para tareas comunes.

---

## Setup Inicial

```bash
git clone https://github.com/miguelescanocedres/cdresweb.git
cd cdres-web
npm install
npm run dev
# http://localhost:3000
```

---

## Comandos Principales

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Desarrollo con hot reload |
| `npm run build` | Build para producción |
| `npm start` | Servir build localmente |
| `npm run lint` | ESLint check |

---

## Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx          # Metadata, fonts, html tag
│   ├── page.tsx            # Home page (compone componentes)
│   └── globals.css         # Estilos globales
├── components/
│   ├── Navbar.tsx          # Navegación
│   ├── HeroSplash.tsx      # Portada animada
│   ├── Services.tsx        # 5 servicios Bento Grid
│   ├── ParticleHero.tsx    # Canvas partículas
│   ├── HowItWorks.tsx      # Proceso en pasos
│   ├── WhyCdres.tsx        # Diferenciadores
│   ├── CTASection.tsx      # Call to action
│   ├── Footer.tsx          # Pie
│   ├── WhatsAppWidget.tsx  # Chat flotante
│   └── ui/                 # Componentes base (shadcn/ui)
└── lib/
    └── utils.ts            # cn() helper
```

---

## Agregar Nueva Sección

1. **Crear componente**
```typescript
// src/components/NewSection.tsx
"use client"

export function NewSection() {
  return <section>...</section>
}
```

2. **Importar en page.tsx**
```typescript
import { NewSection } from "@/components/NewSection"

export default function Home() {
  return (
    <>
      {/* ... */}
      <NewSection />
      {/* ... */}
    </>
  )
}
```

---

## Cambiar Colores CDRES

En `src/app/globals.css`:
```css
@theme inline {
  --color-cdres-blue: #0066FF;      /* CAMBIAR AQUÍ */
  --color-cdres-cyan: #00D4FF;
  --color-cdres-emerald: #00E479;
}
```

Luego usar:
```typescript
style={{ color: "var(--color-cdres-blue)" }}
```

---

## Branding Colors

| Nombre | Hex | Uso |
|--------|-----|-----|
| Blue | #0066FF | Logo DRES, links |
| Cyan | #00D4FF | Accent, glow |
| Emerald | #00E479 | CTA, highlights |
| Gray | #8892A4 | INTEC, muted text |
| Dark | #060B12 | Background |

---

## Fonts

| Font | Uso | Weights |
|------|-----|---------|
| Space Grotesk | Headings | 400, 500, 600, 700 |
| DM Sans | Body | 400, 500, 700 |

Cargados vía `next/font/google` con `display: swap`.

---

## Animaciones Frecuentes

### Framer Motion
```typescript
import { motion } from "framer-motion"

// Entrada simple
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// En scroll
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>

// Hover
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### CSS Animation
```css
/* En globals.css */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-in-out;
}
```

---

## Tailwind Classes Útiles

```
/* Backgrounds */
bg-[#060B12]           /* Dark navy */
bg-[#0066FF]           /* Cdres blue */

/* Text */
text-white             /* Foreground */
text-[#8892A4]         /* Gray muted */

/* Positioning */
fixed, absolute, relative, sticky
inset-0, top-0, bottom-0

/* Sizing */
w-full, h-screen, min-h-screen
w-[700px]              /* Custom width */

/* Effects */
rounded-lg, rounded-2xl
shadow-lg, shadow-2xl
blur-md, blur-lg

/* Animations */
hover:scale-105        /* Hover effect */
transition duration-300 /* Smooth transition */

/* Responsive */
hidden sm:block         /* Mobile: hidden, desktop: visible */
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5
```

---

## SEO

En `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "CDRES INTEC — Soluciones Informáticas",
  description: "...",
  openGraph: { /* og:image, og:title, etc */ },
  twitter: { /* twitter:card, etc */ },
}

const jsonLd = { "@type": "Organization", /* ... */ }
```

---

## Deployment

**Automático al push a main:**
```bash
git checkout main
git merge nombre-rama
git push origin main
# Vercel redeploya en ~2 minutos
```

**URLs:**
- Production: https://cdresintec.com
- Staging: https://cdresweb.vercel.app

---

## Git Workflow

```bash
# Crear rama
git checkout -b nombre-rama

# Cambios
git add .
git commit -m "type: description"

# Push
git push origin nombre-rama

# En GitHub: PR → Review → Merge
git checkout main
git merge nombre-rama
git push origin main
```

**Commit types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`

---

## Performance Tips

1. **Animaciones:** usar `transform` + `opacity` (no width/height)
2. **Scroll:** RAF debounce en listeners
3. **Componentes:** max 800 líneas por archivo
4. **Funciones:** max 50 líneas cada una
5. **Build:** `npm run build` antes de push
6. **Images:** usar Next.js Image component

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Build falla | `rm -rf .next node_modules && npm install` |
| Animación lenta | Verificar Chrome DevTools → Performance |
| Tipografía rota | Verificar `display: swap` en fonts |
| Estilos no aplican | Verificar Tailwind en clase correcta |
| Module not found | Verificar path alias en `tsconfig.json` |

---

## Números & Enlaces

| Dato | Valor |
|------|-------|
| WhatsApp | +598 98 331 920 |
| Email | miguelescano@gmail.com |
| Sitio | https://cdresintec.com |
| GitHub | github.com/miguelescanocedres/cdresweb |

---

## Componentes No Usados

Considerar eliminar si no planeas usarlos:
- `particle-build-text.tsx`
- `vapour-text-effect.tsx`
- `motion-footer.tsx`
- `SplashScreen.tsx`

---

## Recursos

- **React:** https://react.dev
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion
- **TypeScript:** https://www.typescriptlang.org/docs

---

## Documentación Completa

- `README.md` — Overview general
- `ARCHITECTURE.md` — Detalle técnico
- `DEVELOPMENT_GUIDE.md` — Guía paso a paso
- `QUICK_REFERENCE.md` — Este archivo

---

**Last Updated:** 2026-05-07
