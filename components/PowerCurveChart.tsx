"use client";

import { useLayoutEffect, useRef, useState } from "react";

const CURVE_PATH =
  "M10 150 C 70 150, 110 60, 170 30 C 210 16, 260 10, 300 14 C 320 16, 335 22, 350 30";
const BASELINE = 150;
const FALLBACK_LENGTH = 9999;
const DRAW_DURATION = 1.4;

export function PowerCurveChart({
  chOrigine,
  chFinal,
  stageLabel,
  className = "",
}: {
  chOrigine: number;
  chFinal: number;
  stageLabel: string;
  className?: string;
}) {
  const originScale = Math.min(chOrigine / chFinal, 0.98);
  const originTransform = `translate(0 ${BASELINE}) scale(1 ${originScale}) translate(0 ${-BASELINE})`;

  const svgRef = useRef<SVGSVGElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const started = useRef(false);
  const [length, setLength] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setLength(measureRef.current.getTotalLength());
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setVisible(true);
      return;
    }

    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dashLength = length ?? FALLBACK_LENGTH;
  const lineStyle = (delay: number): React.CSSProperties =>
    reducedMotion
      ? {}
      : {
          strokeDasharray: dashLength,
          strokeDashoffset: visible ? 0 : dashLength,
          transition: `stroke-dashoffset ${DRAW_DURATION}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        };
  const fadeStyle = (delay: number): React.CSSProperties =>
    reducedMotion
      ? {}
      : {
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ease-out ${delay}s`,
        };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 360 190"
      className={className}
      role="img"
      aria-label={`Courbe de puissance : ${chOrigine} ch d'origine contre ${chFinal} ch en ${stageLabel}`}
    >
      {[30, 70, 110, 150].map((y) => (
        <line
          key={y}
          x1={10}
          x2={350}
          y1={y}
          y2={y}
          stroke="var(--border)"
          strokeWidth={1}
        />
      ))}
      <line x1={10} x2={10} y1={10} y2={150} stroke="var(--border)" strokeWidth={1} />
      <line x1={10} x2={350} y1={150} y2={150} stroke="var(--border)" strokeWidth={1} />

      <path
        ref={measureRef}
        d={CURVE_PATH}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={2}
        transform={originTransform}
        style={lineStyle(0)}
      />
      <path
        d={CURVE_PATH}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={2.5}
        style={lineStyle(0.15)}
      />
      <circle
        cx={350}
        cy={30}
        r={3.5}
        fill="var(--accent)"
        style={fadeStyle(DRAW_DURATION)}
      />

      <text
        x={10}
        y={10}
        className="fill-accent"
        fontSize={11}
        fontWeight={600}
        style={fadeStyle(DRAW_DURATION * 0.5)}
      >
        {stageLabel} — {chFinal} ch
      </text>
      <text
        x={10}
        y={BASELINE * originScale + (1 - originScale) * BASELINE - 6}
        className="fill-muted"
        fontSize={11}
        style={fadeStyle(0.2)}
      >
        origine — {chOrigine} ch
      </text>

      <text x={2} y={95} className="fill-muted" fontSize={10} textAnchor="middle" transform="rotate(-90 2 95)">
        ch
      </text>
      <text x={352} y={168} className="fill-muted" fontSize={10} textAnchor="end">
        tr/min
      </text>
      <text x={10} y={168} className="fill-muted" fontSize={10}>
        0
      </text>
    </svg>
  );
}
