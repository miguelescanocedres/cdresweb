"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

interface Segment {
  text: string
  className?: string
}

interface AnimatedHeadingProps {
  segments: Segment[]
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3"
}

export function AnimatedHeading({
  segments,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const allWords: { word: string; segClass?: string }[] = segments.flatMap((seg) =>
    seg.text.split(" ").filter(Boolean).map((word) => ({ word, segClass: seg.className }))
  )

  return (
    <Tag ref={ref} className={`${className} flex flex-wrap`} aria-label={segments.map((s) => s.text).join(" ")}>
      {allWords.map(({ word, segClass }, i) => (
        <span key={i} className="overflow-hidden mr-[0.3em] last:mr-0">
          <motion.span
            className={`inline-block${segClass ? ` ${segClass}` : ""}`}
            initial={{ y: "110%" }}
            animate={isInView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.065,
            }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
