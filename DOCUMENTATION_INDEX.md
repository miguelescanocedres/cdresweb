# CDRES INTEC — Documentation Index

Índice completo de documentación del proyecto.

**Última actualización:** 2026-05-07

---

## Documentos Principales

### 1. **README.md** (496 líneas)
**Para:** Cualquiera que necesita entender qué es el proyecto

Contiene:
- Stack tecnológico (Next.js 16, React 19, TypeScript, Tailwind, Framer Motion)
- Estructura de carpetas (`src/app`, `src/components`, `src/lib`)
- Descripción de componentes principales (HeroSplash, Services, ParticleHero, Navbar, WhatsAppWidget)
- Branding & Design System (colores CDRES, tipografía, utilidades CSS)
- SEO & Meta Tags
- Desarrollo local (setup, comandos)
- Deployment (Vercel)
- Performance optimizations
- Accesibilidad (a11y)
- Troubleshooting
- Futuras mejoras

**Leer si:** necesitas overview general del proyecto

---

### 2. **ARCHITECTURE.md** (454 líneas)
**Para:** Desarrolladores que necesitan entender la arquitectura técnica

Contiene:
- Visión general y características clave
- Árbol de componentes (component hierarchy)
- Componentes detallados (props, state, effects, rendering)
- Data flow & architecture (cómo fluyen datos entre componentes)
- Styling strategy (Tailwind CSS v4, layers, utility classes)
- Performance optimizations (fonts, images, bundle size, animations)
- Accesibilidad detallada (ARIA, semantic HTML)
- SEO implementation (meta tags, JSON-LD)
- File size analysis
- Deployment pipeline
- Configuración importante (next.config, tailwind.config, tsconfig)
- Roadmap futuro

**Leer si:** necesitas entender cómo funciona el código técnicamente

---

### 3. **DEVELOPMENT_GUIDE.md** (454 líneas)
**Para:** Desarrolladores que van a modificar, extender o mantener el código

Contiene:
- Setup local (paso a paso)
- Patrones de desarrollo (cómo agregar componentes, modificar existentes)
- Cambios comunes (colores, metadata SEO, variables de entorno)
- Testing local (build production, Lighthouse, responsive, performance)
- Troubleshooting común (Module not found, jank animations, build fails)
- Flujo de commits & push (conventional commits, merge a main)
- Performance checklist (antes de mergear)
- Componentes no usados (cleanup suggestions)
- Recursos para aprender (links a docs)
- FAQ (preguntas frecuentes)

**Leer si:** vas a hacer cambios en el código

---

### 4. **QUICK_REFERENCE.md** (320 líneas)
**Para:** Búsquedas rápidas y consultas frecuentes

Contiene:
- Setup inicial (copy-paste)
- Comandos principales (npm run dev, build, start, lint)
- Estructura de archivos (quick map)
- Tareas comunes (agregar sección, cambiar colores)
- Branding colors (tabla rápida)
- Fonts (tabla rápida)
- Animaciones frecuentes (código de ejemplo)
- Tailwind classes útiles (snippets)
- SEO (snippet de metadata)
- Deployment (push a main)
- Git workflow (paso a paso)
- Performance tips
- Troubleshooting rápido (tabla)
- Números & enlaces
- Componentes no usados
- Recursos

**Leer si:** necesitas buscar algo rápido sin leer documentación completa

---

## Otros Documentos

### 5. **AGENTS.md**
Define skills obligatorios para trabajo web:
- `ui-ux-pro-max` — sistema de diseño, paleta, tipografía
- `nextjs-best-practices` — patrones App Router
- `tailwind-design-system` — si usas Tailwind

### 6. **CLAUDE.md**
Referencias globales del proyecto (links a documentación mayor).

---

## Cómo Navegar Esta Documentación

### Situación: "Necesito entender qué es CDRES INTEC web"
**Leer:** README.md (Introducción)

### Situación: "Voy a hacer cambios en el código"
**Leer en orden:**
1. README.md (overview)
2. DEVELOPMENT_GUIDE.md (cómo hacer cambios)
3. QUICK_REFERENCE.md (búsquedas rápidas mientras codeas)
4. ARCHITECTURE.md (si necesitas entender detalles técnicos)

### Situación: "Necesito agregar un componente nuevo"
**Leer:** DEVELOPMENT_GUIDE.md → "Agregar un Componente Nuevo"

### Situación: "¿Cómo cambio X?"
**Hacer:**
1. Buscar en QUICK_REFERENCE.md
2. Si no encontras, leer DEVELOPMENT_GUIDE.md sección relevante
3. Si aún necesitas detalles, leer ARCHITECTURE.md

### Situación: "Animación está lenta"
**Leer:** DEVELOPMENT_GUIDE.md → "Animación entrecortada (jank)"

### Situación: "Build falla"
**Leer:** DEVELOPMENT_GUIDE.md → "Build falla"

---

## Resumen Técnico Rápido

```
Stack:
├── Framework: Next.js 16.2.1 (App Router)
├── Runtime: React 19.2.4 (Server Components)
├── Language: TypeScript 5.x
├── Styling: Tailwind CSS 4.0 (utility-first)
├── Animations: Framer Motion 12.38.0 + GSAP 3.15.0
├── Icons: Lucide React 0.577.0 (SVG)
└── UI: shadcn/ui (headless components)

Estructura:
└── src/
    ├── app/
    │   ├── layout.tsx (metadata, fonts)
    │   ├── page.tsx (home page)
    │   └── globals.css (estilos + variables)
    ├── components/
    │   ├── Navbar, HeroSplash, Services, ParticleHero
    │   ├── HowItWorks, WhyCdres, CTASection, Footer
    │   ├── WhatsAppWidget
    │   └── ui/ (shadcn/ui components)
    └── lib/
        └── utils.ts (cn() helper)

Branding:
├── Colors: #0066FF (blue), #00D4FF (cyan), #00E479 (emerald), #060B12 (dark)
├── Fonts: Space Grotesk (headings), DM Sans (body)
├── WhatsApp: +598 98 331 920

Deployment:
├── Vercel (automático al push a main)
├── Staging: cdresweb.vercel.app
└── Production: cdresintec.com
```

---

## Checklist Para Nuevos Desarrolladores

- [ ] Leer README.md completo
- [ ] Clonar repo y `npm install`
- [ ] Correr `npm run dev` y navegar sitio
- [ ] Revisar estructura de `src/components/`
- [ ] Leer ARCHITECTURE.md para entender flujo
- [ ] Revisar DEVELOPMENT_GUIDE.md antes de hacer cambios
- [ ] Guardar QUICK_REFERENCE.md como bookmark

---

## Archivos a Tener en Mente

| Archivo | Cambias si... |
|---------|---------------|
| `src/app/layout.tsx` | Necesitas actualizar metadata SEO, agregar fonts, cambiar html tag |
| `src/app/page.tsx` | Necesitas agregar/reordenar secciones |
| `src/app/globals.css` | Necesitas cambiar colores, fonts, animaciones globales |
| `src/components/Navbar.tsx` | Necesitas cambiar links, logo, mobile menu |
| `src/components/HeroSplash.tsx` | Necesitas cambiar portada (animaciones, texto) |
| `src/components/Services.tsx` | Necesitas cambiar servicios (cards, colores, descripción) |
| `src/components/WhatsAppWidget.tsx` | Necesitas cambiar número WhatsApp, mensaje inicial |
| `tailwind.config.js` | Necesitas agregar custom utilities, cambiar config Tailwind |
| `next.config.js` | Necesitas cambiar image optimization, compression |
| `tsconfig.json` | Necesitas cambiar path aliases o compiler options |
| `package.json` | Necesitas agregar/actualizar dependencias |

---

## Performance Targets

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **FCP:** < 1.8s
- **Lighthouse Performance:** 90+
- **Lighthouse Accessibility:** 95+
- **Lighthouse SEO:** 100

---

## Git Workflow Estándar

```bash
# 1. Crear rama
git checkout -b nombre-rama

# 2. Hacer cambios + commits
git add .
git commit -m "type: description"

# 3. Push rama
git push origin nombre-rama

# 4. En GitHub: crear PR, revisar, mergear
# 5. Vercel redeploya automáticamente en ~2 min
```

---

## Contacts & Support

- **Email:** miguelescano@gmail.com
- **WhatsApp:** +598 98 331 920
- **GitHub:** https://github.com/miguelescanocedres/cdresweb
- **Sitio:** https://cdresintec.com

---

## Versioning

**Documentación:** v1.0 (2026-05-07)  
**Proyecto:** Next.js 16.2.1, React 19.2.4, TypeScript 5.x, Tailwind 4.0

---

## Links Rápidos

| Recurso | URL |
|---------|-----|
| Next.js Docs | https://nextjs.org/docs |
| React Docs | https://react.dev |
| Tailwind Docs | https://tailwindcss.com/docs |
| Framer Motion | https://www.framer.com/motion |
| TypeScript | https://www.typescriptlang.org/docs |
| Vercel Deploy | https://vercel.com |

---

**Nota:** Mantener esta documentación actualizada. Si encuentras algo obsoleto, actualiza los archivos relevantes.
