const CURVE_PATH =
  "M10 150 C 70 150, 110 60, 170 30 C 210 16, 260 10, 300 14 C 320 16, 335 22, 350 30";
const BASELINE = 150;

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

  return (
    <svg
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
        d={CURVE_PATH}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={2}
        transform={originTransform}
      />
      <path d={CURVE_PATH} fill="none" stroke="var(--accent)" strokeWidth={2.5} />
      <circle cx={350} cy={30} r={3.5} fill="var(--accent)" />

      <text x={10} y={10} className="fill-accent" fontSize={11} fontWeight={600}>
        {stageLabel} — {chFinal} ch
      </text>
      <text x={10} y={BASELINE * originScale + (1 - originScale) * BASELINE - 6} className="fill-muted" fontSize={11}>
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
