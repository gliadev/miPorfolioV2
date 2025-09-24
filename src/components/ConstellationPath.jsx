import { useId } from "react";

export default function ConstellationPath({
  pathD,
  className = "text-indigo-500 dark:text-indigo-300",
  strokeWidth = 2,
  animate = true,
}) {
  const uid = useId();
  const gradId = `orb-${uid}`;
  const glowId = `glow-${uid}`;

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
        {}
        <linearGradient id={gradId} x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>

        {}
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
        pathLength="1" 
      >
        {}
        {animate && (
          <animate
            attributeName="stroke-dasharray"
            from="0,1"
            to="1,0"
            dur="1.1s"
            fill="freeze"
            begin="0.1s"
          />
        )}
      </path>
    </svg>
  );
}
