"use client"

import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

/**
 * CosmicButton — Cult UI button con gradiente cosmic customizado a paleta CDRES.
 * Paleta: #0066FF (blue) → #00D4FF (cyan) → #00E479 (emerald)
 *
 * Requiere keyframes `cosmic-spin` y `cosmic-spin-slow` en globals.css.
 */
export type CosmicButtonProps<E extends "a" | "button" = "a"> = {
  /** Elemento HTML a renderizar. @default "a" */
  as?: E
} & ComponentPropsWithoutRef<E>

export function CosmicButton<E extends "a" | "button" = "a">({
  as,
  className,
  children,
  ...props
}: CosmicButtonProps<E>) {
  const Element = as ?? "a"
  const isAnchor = Element === "a"

  const baseClassName = cn(
    "group/cosmic relative inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-[15px] p-[2px] transition-transform cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B12]",
    className
  )

  const content = (
    <>
      {/* Borde cosmic animado — paleta CDRES (blue → cyan → emerald) */}
      <span className="absolute inset-0 overflow-hidden rounded-[15px] transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px]">
        <span
          className="absolute inset-[-200%] animate-cosmic-spin opacity-95"
          style={{
            background:
              "conic-gradient(from 0deg, #0066FF, #00D4FF, #00E479, #00D4FF, #0066FF, #003D99, #0066FF)",
          }}
        />
      </span>

      {/* Capa de textura suave */}
      <span className="absolute inset-0 overflow-hidden rounded-[15px] opacity-50 mix-blend-overlay transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px]">
        <span
          className="absolute inset-[-200%] animate-cosmic-spin-slow"
          style={{
            background:
              "conic-gradient(from 180deg, #00D4FF 0%, transparent 30%, #0066FF 50%, transparent 70%, #00E479 100%)",
          }}
        />
      </span>

      {/* Fondo interno — superficie dark CDRES */}
      <span
        className="relative z-10 flex items-center gap-3 rounded-[13px] px-6 py-2.5 transition-all duration-300 group-hover/cosmic:px-7 active:scale-[0.98]"
        style={{
          background: "linear-gradient(145deg, #0E1525 0%, #060B12 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(0, 212, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.5), 0 1px 1px rgba(0, 0, 0, 0.45), 0 10px 28px rgba(0, 102, 255, 0.18)",
        }}
      >
        <span className="font-semibold text-base tracking-wide text-white">
          {children ?? "Acción"}
        </span>
      </span>
    </>
  )

  if (isAnchor) {
    const { href, rel, target, ...rest } =
      props as ComponentPropsWithoutRef<"a">
    return (
      <a
        className={baseClassName}
        href={href ?? "#"}
        rel={rel ?? "noopener noreferrer"}
        target={target}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={baseClassName}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  )
}
