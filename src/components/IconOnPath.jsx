import { useEffect, useMemo, useState } from "react";

export default function IconOnPath({
  pathD,
  icon,
  name,
  showLabel = true,
  speed = 22,
  offset = 0,            // 0–100
  href,
  size = 48,
  iconClassName = "",
  paused = false,        // pausa externa
  rotateWithPath = false,
  respectReducedMotion = true, // <-- NUEVO: permite ignorar "reducir movimiento"
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!respectReducedMotion) { setReducedMotion(false); return; }
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(!!mq?.matches);
    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, [respectReducedMotion]);

  const style = useMemo(() => {
    const delay = -((offset / 100) * speed);
    return {
      /* IMPORTANTE: comillas dobles dentro de path() para Safari */
      offsetPath: `path("${pathD}")`,
      WebkitOffsetPath: `path("${pathD}")`,

      /* La animación la declara el CSS (.icon-on-path) pero seteamos timing aquí */
      animationName: "travel",
      animationDuration: `${speed}s`,
      WebkitAnimationDuration: `${speed}s`,
      animationDelay: `${delay}s`,
      WebkitAnimationDelay: `${delay}s`,
      animationDirection: "normal",
      WebkitAnimationDirection: "normal",
      animationPlayState: (paused || reducedMotion) ? "paused" : "running",
      WebkitAnimationPlayState: (paused || reducedMotion) ? "paused" : "running",

      offsetDistance: "0%",
      WebkitOffsetDistance: "0%",

      offsetRotate: rotateWithPath ? "auto" : "0deg",
      WebkitOffsetRotate: rotateWithPath ? "auto" : "0deg",

      width: `${size}px`,
      height: `${size}px`,
      position: "absolute",
      transform: "translateZ(0)",
    };
  }, [pathD, offset, speed, paused, reducedMotion, rotateWithPath, size]);

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noreferrer" } : { tabIndex: 0 };

  return (
    <Wrapper
      className="icon-on-path outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded-xl"
      style={style}
      {...wrapperProps}
      aria-label={name}
      title={showLabel ? name : undefined}
    >
      <img
        src={icon}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`w-full h-full object-contain bg-white/5 dark:bg-white/10 rounded-xl border border-white/10 shadow ${iconClassName}`}
      />
      {showLabel && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full -translate-x-1/2 mt-1 px-2 py-0.5 text-[11px] rounded bg-black/60 text-white whitespace-nowrap"
        >
          {name}
        </span>
      )}
    </Wrapper>
  );
}
