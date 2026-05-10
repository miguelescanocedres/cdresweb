# Session Continuity — CDRES Web

> Última actualización: 2026-05-09

## Where Am I?
Setup del agente Levi + sistema de continuidad en opencode para cdres-web

## Current Branch / Focus
main — infraestructura de trabajo: agentes y flujo opencode ↔ Claude Code Web

## What Was Done
- Creado agente `levi` en `.opencode/agents/levi.md` (primary, personalidad completa, skills organizados)
- Creado `SESSION.md` para este proyecto
- Configurado el puente de continuidad entre opencode y Claude Code Web

## Key Decisions
- Levi como primary agent (Tab) — mismo mindset que en Claude Code pero con permisos `ask`
- Skills organizados en 5 categorías: Estrategia, Web/CDRES, Growth, Técnico, Proceso
- `SESSION.md` como punto de entrada/salida obligatorio en cada sesión

## Files Touched
- `.opencode/agents/levi.md` — creado
- `SESSION.md` — creado

## Next Steps
- [ ] Probar el switch Tab → Levi en opencode
- [ ] Probar invocation de skills desde Levi
- [ ] Probar el flujo opencode → Claude Code Web usando SESSION.md como puente

## Notes / Warnings
- Levi tiene edit/bash en `ask` — pedirá confirmación antes de modificar archivos
- Si cambias a Claude Code Web, asegúrate de actualizar este SESSION.md antes de salir de opencode

## Switched From → To
(initial setup — no switch yet)
