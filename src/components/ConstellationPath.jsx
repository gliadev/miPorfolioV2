import { useId, useLayoutEffect, useRef } from "react";

export default function ConstellationPath({
  pathD,
  className = "text-indigo-500 dark:text-indigo-300",
  strokeWidth = 2,
  animate = true,
  durationMs = 1100,
  gradientOpacityStart = 0.95,
  gradientOpacityEnd = 0.55,
  blur = 2,
}) {
  const uid = useId();
  const gradId = `orb-${uid}`;
  const glowId = `glow-${uid}`;
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = animate ? `${len}` : "0";
    p.style.animation = animate ? `draw ${durationMs}ms ease-out forwards` : "none";
  }, [pathD, animate, durationMs]);

  return (
    <svg
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
      viewBox="0 0 300 450"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={gradientOpacityStart} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={gradientOpacityEnd} />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={blur} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}
