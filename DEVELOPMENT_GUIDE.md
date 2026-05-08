# CDRES INTEC — Development Guide

Guía para modificar, extender y mantener el sitio.

---

## Antes de Hacer Cambios

### 1. Verificar Setup Local
```bash
# Clonar + instalar
git clone https://github.com/miguelescanocedres/cdresweb.git
cd cdres-web
npm install

# Verificar que funciona
npm run dev
# Abrir http://localhost:3000
```

### 2. Crear Rama de Feature
```bash
# Nunca commitear directo a main
git checkout -b nombre-rama
# ej: git checkout -b new-section, git checkout -b fix-navbar
```

### 3. Entender la Arquitectura
- Lee `README.md` para overview
- Lee `ARCHITECTURE.md` para detalles técnicos
- Inspecciona componentes en `src/components/`

---

## Patrones de Desarrollo

### Agregar un Componente Nuevo

**1. Crear archivo en `src/components/`**
```typescript
// src/components/MyComponent.tsx
"use client"  // Si tiene interactividad

import { motion } from "framer-motion"

interface MyComponentProps {
  title: string
  // otras props
}

export function MyComponent({ title }: MyComponentProps) {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
    </section>
  )
}
```

**2. Importar en `src/app/page.tsx`**
```typescript
import { MyComponent } from "@/components/MyComponent"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSplash />
        <MyComponent title="New Section" />
        <Services />
        {/* ... resto de secciones */}
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
```

**3. Estilos con Tailwind**
```typescript
// Usar clases utility de Tailwind
<div className="bg-[#060B12] text-white p-4 rounded-lg">

// Importar variables CSS si es necesario
<div style={{ background: "var(--color-cdres-blue)" }}>
```

**4. Animaciones**
```typescript
// Opción A: Framer Motion (recomendado)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>

// Opción B: GSAP (para efectos complejos)
import gsap from "gsap"

useEffect(() => {
  gsap.to(ref.current, { duration: 1, opacity: 1 })
}, [])

// Opción C: CSS animation (animaciones sencillas)
// Definir en globals.css, usar .animate-custom
```

---

### Modificar Componente Existente

**Ejemplo: Agregar enlace a Services**

```typescript
// src/components/Services.tsx
const services = [
  {
    // ... datos existentes
    href: "/servicios/automatizaciones"  // NUEVO
  },
  // ... otros servicios
]

// En el render:
<a href={service.href} className="cursor-pointer">
  <div className="...">
    {/* contenido del card */}
  </div>
</a>
```

**Verificar:**
```bash
npm run build    # Verificar que compila
npm run dev      # Probar en local
```

---

### Cambiar Colores de Branding

**En `src/app/globals.css`:**
```css
@theme inline {
  /* Actualizar aquí */
  --color-cdres-blue: #0066FF;      /* CAMBIAR */
  --color-cdres-cyan: #00D4FF;
  --color-cdres-emerald: #00E479;
}
```

**En componentes:**
```typescript
// Opción A: Usar variable CSS
style={{ color: "var(--color-cdres-blue)" }}

// Opción B: Hardcoded hex (menos mantenible)
style={{ color: "#0066FF" }}
```

---

### Actualizar SEO Metadata

**En `src/app/layout.tsx`:**
```typescript
export const metadata: Metadata = {
  title: "NUEVO TÍTULO",  // CAMBIAR
  description: "NUEVA DESCRIPCIÓN",  // CAMBIAR
  keywords: ["palabra1", "palabra2"],  // CAMBIAR
  openGraph: {
    images: [{ url: "/og-image-nuevo.png" }],  // SI CAMBIAR IMAGEN
  },
  // ... resto
}
```

---

### Agregar Variable de Entorno

**Nota:** Este proyecto NO requiere env vars en build time (es SSG).

Si necesitas env vars en runtime:
```bash
# En .env.local
NEXT_PUBLIC_CUSTOM_VAR=value

# En componente
const value = process.env.NEXT_PUBLIC_CUSTOM_VAR
```

---

## Testing Local

### Build Production
```bash
npm run build       # Compila a .next/
npm start           # Sirve build localmente
# Abrir http://localhost:3000
```

### Lighthouse Audit
```bash
# En Chrome DevTools
DevTools > Lighthouse > Generate report

# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 90+
# SEO: 100
```

### Responsive Testing
```bash
# En Chrome DevTools
Ctrl+Shift+M (Windows/Linux) o Cmd+Shift+M (Mac)
# Probar en: iPhone, iPad, Desktop, custom dimensions
```

### Performance Profiling
```bash
# En Chrome DevTools
Performance > Record > interactuar > Stop
# Buscar:
# - Long tasks (> 50ms)
# - Layout shifts (CLS)
# - Slow animations (jank)
```

---

## Troubleshooting Común

### Error: Module not found
```bash
# Verificar path alias en tsconfig.json
# @/* debe apuntar a src/*

# Si sigue fallando:
rm -rf .next
npm run dev
```

### Animación entrecortada (jank)
```typescript
// 1. Verificar will-change en elemento animado
<div style={{ willChange: "transform" }}>

// 2. Usar transform + opacity (no width/height)
// MALO:
initial={{ width: 0 }}
animate={{ width: 100 }}

// BUENO:
initial={{ scaleX: 0 }}
animate={{ scaleX: 1 }}

// 3. RAF debounce en scroll listeners
let rafId: number | null = null
const handleScroll = () => {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    // código aquí
    rafId = null
  })
}
```

### Build falla
```bash
# 1. Verificar tipos TypeScript
npx tsc --noEmit

# 2. Verificar eslint
npm run lint

# 3. Limpiar caché
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Font no carga
```typescript
// En layout.tsx, verificar que está antes de globals.css
import { Space_Grotesk, DM_Sans } from "next/font/google"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap"  // Crucial
})

// En html tag:
<html className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
```

---

## Flujo de Commits & Push

### Antes de Commitear
```bash
# 1. Verificar cambios
git status

# 2. Build test
npm run build

# 3. Lint check
npm run lint

# 4. Revisar cambios
git diff
```

### Commitar
```bash
# Mensaje en formato conventional commits
git add src/components/MyComponent.tsx
git commit -m "feat: add MyComponent section

- Describe los cambios en detalle
- Explica el por qué
"

# O:
git commit -m "fix: fix navbar animation jank"
git commit -m "docs: update README with new content"
```

### Tipos de commits
```
feat:      nueva característica (agregar componente)
fix:       arreglar bug (animación rota)
refactor:  refactorización (mejorar código sin cambiar función)
docs:      documentación (actualizar README)
style:     formato (prettier, cambio de espacios)
chore:     build, deps (npm update, config)
perf:      performance (optimizar animación)
```

### Push & Merge a Main
```bash
# 1. Push rama
git push origin nombre-rama

# 2. En GitHub: crear Pull Request
# - Escribir descripción clara
# - Listar cambios

# 3. Si tests pasan (Vercel build OK):
git checkout main
git pull origin main
git merge nombre-rama
git push origin main

# 4. Vercel redeploya automáticamente
# Verificar en https://cdresintec.com
```

---

## Performance Checklist

Antes de mergear a main:

- [ ] `npm run build` pasa sin errores
- [ ] `npm run lint` pasa
- [ ] Lighthouse scores >= 90 (performance)
- [ ] Sin console.log en código
- [ ] Sin hardcoded secrets/tokens
- [ ] Componentes < 800 líneas
- [ ] Funciones < 50 líneas
- [ ] Animaciones GPU-accelerated (transform + opacity)
- [ ] TypeScript types correcto (sin `any`)
- [ ] Accesibilidad: focus outlines, aria labels

---

## Componentes No Usados

Estos componentes existen pero NO se usan actualmente:

```typescript
// src/components/ui/particle-build-text.tsx      — no usado
// src/components/ui/vapour-text-effect.tsx       — no usado
// src/components/ui/motion-footer.tsx            — no usado
// src/components/SplashScreen.tsx                — no usado
// src/components/Hero.tsx                        — posiblemente no usado
```

**Considerar:** eliminarlos si no planeas usarlos (reducir tamaño).

---

## Recursos para Aprender

### TypeScript
- https://www.typescriptlang.org/docs
- https://www.typescriptlang.org/play

### React + Next.js
- https://react.dev/learn
- https://nextjs.org/docs

### Tailwind CSS
- https://tailwindcss.com/docs
- https://tailwindcss.com/docs/responsive-design

### Framer Motion
- https://www.framer.com/motion/introduction
- Animation best practices

### GSAP
- https://gsap.com/docs/v3/

---

## Preguntas Frecuentes

**P: ¿Dónde agrego un nuevo enlace a la navegación?**  
R: En `src/components/Navbar.tsx`, en el array `navLinks`. Usar anchor links (#servicios, #proceso, etc.) con `smooth-scroll` en `globals.css`.

**P: ¿Cómo cambio el número de WhatsApp?**  
R: En `src/components/WhatsAppWidget.tsx`, actualizar `WA_NUMBER` y `WA_MESSAGE`.

**P: ¿Cómo agregó un nuevo color?**  
R: En `src/app/globals.css`, en la sección `@theme inline { ... }`, agregar `--color-custom: #XXXXXX;` y usar con `var(--color-custom)`.

**P: ¿Cómo hago que una sección solo sea visible en mobile?**  
R: Usar Tailwind responsive classes: `hidden sm:block` (oculto por defecto, visible en sm y mayor).

**P: ¿Performance de animaciones?**  
R: Usar `transform` + `opacity` (GPU-accelerated). Evitar `width`, `height`, `left`, `top` (trigger layout shifts).

---

## Contacto & Support

- **Repo issues:** Crear issue en GitHub
- **Questions:** miguelescano@gmail.com
- **WhatsApp:** +598 98 331 920
