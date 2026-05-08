# START HERE — CDRES INTEC Web Documentation

Bienvenido a la documentación completa del proyecto CDRES INTEC.

**Última actualización:** 2026-05-07

---

## En 30 Segundos

**CDRES INTEC** es un sitio web corporativo moderno construido con:
- **Next.js 16** (React 19, TypeScript)
- **Tailwind CSS v4** (utility-first styling)
- **Framer Motion + GSAP** (animaciones premium)
- **Vercel** (deployment automático)

URL: https://cdresintec.com

---

## Documentos Principales

### 1. README.md — Comienza aquí
Overview general del proyecto: stack, estructura, componentes, setup.

**Leer si:** Eres nuevo en el proyecto.  
**Tiempo:** 20 minutos

### 2. QUICK_REFERENCE.md — Búsquedas rápidas
Snippets, comandos, colores, fonts, código de ejemplo. Copy-paste ready.

**Leer si:** Necesitas consulta rápida mientras codeas.  
**Tiempo:** 5 minutos (o busca una sección específica)

### 3. DEVELOPMENT_GUIDE.md — Para hacer cambios
Patrones de desarrollo, cómo agregar componentes, git workflow, troubleshooting.

**Leer si:** Vas a modificar o extender el código.  
**Tiempo:** 25 minutos

### 4. ARCHITECTURE.md — Detalles técnicos
Árbol de componentes, data flow, styling strategy, performance optimization.

**Leer si:** Necesitas entender arquitectura profundamente.  
**Tiempo:** 20 minutos

### 5. COMPONENTS_REFERENCE.md — Referencia de componentes
Detalle de cada componente (props, state, effects, animaciones).

**Leer si:** Necesitas entender un componente específico.  
**Tiempo:** 10-15 minutos (según el componente)

### 6. DOCUMENTATION_INDEX.md — Índice & navegación
Mapa de toda la documentación, cómo elegir qué leer, checklists.

**Leer si:** No sabes qué documento necesitas.  
**Tiempo:** 5 minutos

---

## Ruta Rápida (5 minutos)

```bash
# 1. Setup
git clone https://github.com/miguelescanocedres/cdresweb.git
cd cdres-web
npm install
npm run dev
# Abrir http://localhost:3000

# 2. Leer README.md (20 min)
# 3. Consultar QUICK_REFERENCE.md mientras codeas
# 4. Leer DEVELOPMENT_GUIDE.md si haces cambios
```

---

## Ruta Completa (45 minutos)

1. **README.md** (20 min) — Overview general
2. **QUICK_REFERENCE.md** (5 min) — Búsquedas rápidas
3. **DEVELOPMENT_GUIDE.md** (15 min) — Patrones desarrollo
4. **ARCHITECTURE.md** (10 min) — Detalles técnicos (opcional)
5. **COMPONENTS_REFERENCE.md** (10 min) — Referencia componentes (según necesidad)

---

## Stack en Pocas Palabras

| Aspecto | Technology | Version |
|---------|-----------|---------|
| Framework | Next.js | 16.2.1 |
| Runtime | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.0 |
| Animations | Framer Motion | 12.38.0 |
| Animations | GSAP | 3.15.0 |
| Icons | Lucide React | 0.577.0 |
| Deploy | Vercel | - |

---

## Colores Brand

```css
--color-cdres-blue: #0066FF       /* Logo DRES */
--color-cdres-cyan: #00D4FF       /* Accent */
--color-cdres-emerald: #00E479    /* CTA */
--background: #060B12             /* Dark navy */
```

---

## Componentes Principales

1. **HeroSplash** — Portada fullscreen animada
2. **Navbar** — Navegación sticky con logo
3. **Services** — Bento Grid de 5 servicios
4. **ParticleHero** — Partículas en canvas
5. **HowItWorks** — Proceso en pasos
6. **WhyCdres** — Diferenciadores
7. **CTASection** — Call to action
8. **Footer** — Pie de página
9. **WhatsAppWidget** — Chat flotante

---

## Comandos Esenciales

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build para producción
npm start        # Servir build localmente
npm run lint     # ESLint check
```

---

## Git Workflow

```bash
# 1. Crear rama
git checkout -b nombre-rama

# 2. Hacer cambios + commit
git add .
git commit -m "type: description"

# 3. Push
git push origin nombre-rama

# 4. En GitHub: crear PR → merge
git checkout main
git merge nombre-rama
git push origin main

# Vercel redeploya automáticamente (~2 min)
```

---

## Performance Targets

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse Performance: 90+

---

## URLs Importantes

| Recurso | URL |
|---------|-----|
| Sitio | https://cdresintec.com |
| Staging | https://cdresweb.vercel.app |
| GitHub | https://github.com/miguelescanocedres/cdresweb |
| Email | miguelescano@gmail.com |
| WhatsApp | +598 98 331 920 |

---

## Checklists

### Antes de Hacer Cambios
- [ ] Leer README.md
- [ ] `npm install` & `npm run dev`
- [ ] Revisar DEVELOPMENT_GUIDE.md

### Antes de Pusher a Main
- [ ] `npm run build` sin errores
- [ ] `npm run lint` sin errores
- [ ] Lighthouse score 90+
- [ ] No hay console.log
- [ ] Tested en mobile

### Nuevo Desarrollador
- [ ] Leer START_HERE.md (este archivo)
- [ ] Leer README.md
- [ ] Clone repo & npm install
- [ ] Leer QUICK_REFERENCE.md
- [ ] Leer DEVELOPMENT_GUIDE.md

---

## Preguntas Frecuentes

**P: ¿Por dónde empiezo?**  
R: Lee README.md, luego consulta QUICK_REFERENCE.md mientras codeas.

**P: ¿Cómo hago cambios?**  
R: Lee DEVELOPMENT_GUIDE.md → sigue patrones → test local → push a main.

**P: ¿Dónde está X?**  
R: Busca en QUICK_REFERENCE.md o COMPONENTS_REFERENCE.md.

**P: ¿Cómo cambio colores?**  
R: Ve a QUICK_REFERENCE.md → "Cambiar Colores CDRES".

**P: ¿Cómo agrego un componente?**  
R: Ve a DEVELOPMENT_GUIDE.md → "Agregar un Componente Nuevo".

**P: ¿Dónde está la documentación?**  
R: Aquí en `/Users/miguelescano/Projects/cdres-web/*.md`.

---

## Archivos Generados

```
/Users/miguelescano/Projects/cdres-web/
├── START_HERE.md                 ← Tú estás aquí
├── README.md                     ← Empezar aquí
├── QUICK_REFERENCE.md            ← Búsquedas rápidas
├── DEVELOPMENT_GUIDE.md          ← Para hacer cambios
├── ARCHITECTURE.md               ← Detalles técnicos
├── COMPONENTS_REFERENCE.md       ← Referencia componentes
├── DOCUMENTATION_INDEX.md        ← Índice & navegación
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── HeroSplash.tsx
│   │   ├── Services.tsx
│   │   ├── Navbar.tsx
│   │   ├── WhatsAppWidget.tsx
│   │   └── ... (más componentes)
│   └── lib/
│       └── utils.ts
└── package.json
```

---

## Próximos Pasos

1. **Ahora:** Lee README.md (20 min)
2. **Luego:** Copia QUICK_REFERENCE.md a tu editor favorito (bookmark)
3. **Antes de codear:** Lee DEVELOPMENT_GUIDE.md (15 min)
4. **Mientras codeas:** Consulta QUICK_REFERENCE.md y COMPONENTS_REFERENCE.md
5. **Dudas técnicas:** Revisa ARCHITECTURE.md

---

## Recursos Externos

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion

---

## Estadísticas

- **Total documentado:** 2,571 líneas
- **Documentos:** 6 + este archivo
- **Tiempo lectura completo:** 45 minutos
- **Tiempo lectura rápido:** 5 minutos
- **Stack:** 7 tecnologías principales
- **Componentes:** 9 principales + UI base
- **Última actualización:** 2026-05-07

---

## Contacto

- **Email:** miguelescano@gmail.com
- **WhatsApp:** +598 98 331 920
- **GitHub:** @miguelescanocedres

---

**¿Listo para empezar? → Lee README.md**

