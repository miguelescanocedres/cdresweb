<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Skills obligatorios para trabajo web

Antes de diseñar, crear o modificar componentes visuales, invocar SIEMPRE los siguientes skills en este orden:

1. `ui-ux-pro-max` — sistema de diseño, paleta, tipografía, efectos, anti-patrones
2. `nextjs-best-practices` — patrones App Router, Server Components, performance
3. `tailwind-design-system` — si se trabaja con Tailwind y se construye un sistema de diseño

Reglas:
- Nunca usar emojis como iconos — siempre SVG (Heroicons / Lucide style)
- Siempre agregar `cursor-pointer` a elementos interactivos
- Hover states con transiciones 150-300ms
- Layouts asimétricos (Bento Grid) sobre grids simétricos genéricos
