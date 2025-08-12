export default function ConstellationPath({ pathD }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-0"
      viewBox="0 0 300 450"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
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
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-indigo-500 dark:text-indigo-300"
        filter="url(#glow)"
      />
    </svg>
  );
}
