import { useEffect, useMemo, useState } from "react";

export default function IconOnPath({
  pathD,
  icon,
  name,
  showLabel = true,
  speed = 22,
  offset = 0,          // 0–100
  href,
  size = 48,
  iconClassName = "",
  paused = false,       // pausado desde fuera
  rotateWithPath = false, // NO rotar por defecto
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(!!mq?.matches);
    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, []);

  const style = useMemo(() => {
    const delay = -((offset / 100) * speed); // <-- DESFASE para que arranque en 'offset'
    return {
      offsetPath: `path('${pathD}')`,
      WebkitOffsetPath: `path('${pathD}')`,
      // la keyframe "travel" anima offset-distance; aquí solo fijamos la fase
      offsetDistance: "0%",
      WebkitOffsetDistance: "0%",
      animationDuration: `${speed}s`,
      WebkitAnimationDuration: `${speed}s`,
      animationDelay: `${delay}s`,
      WebkitAnimationDelay: `${delay}s`,
      animationDirection: "normal",
      WebkitAnimationDirection: "normal",
      animationPlayState: paused || reducedMotion ? "paused" : "running",
      WebkitAnimationPlayState: paused || reducedMotion ? "paused" : "running",
      offsetRotate: rotateWithPath ? "auto" : "0deg",
      WebkitOffsetRotate: rotateWithPath ? "auto" : "0deg",
      width: `${size}px`,
      height: `${size}px`,
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
