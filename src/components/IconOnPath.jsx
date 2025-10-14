import { useEffect, useMemo, useRef, useState } from "react";

export default function IconOnPath({
  pathD,
  icon,
  name,
  showLabel = true,
  speed = 22,                 // segundos por vuelta
  offset = 0,                 // 0..100 (fase inicial)
  href,
  size = 48,
  iconClassName = "",
  paused = false,
  rotateWithPath = false,
  respectReducedMotion = true,
  forceJs = false,            // permite forzar fallback
}) {
  const wrapRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Safari (iOS/macOS)
  const isSafari = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    return /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS|Edg/i.test(ua);
  }, []);

  const cssSupports =
    typeof CSS !== "undefined" &&
    (CSS.supports?.("offset-path", 'path("M0,0 L1,1")') || CSS.supports?.('offset-path: path("M0,0 L1,1")'));

  const useJs = forceJs || isSafari || !cssSupports;

  useEffect(() => {
    if (!respectReducedMotion) { setReducedMotion(false); return; }
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(!!mq?.matches);
    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, [respectReducedMotion]);

  // --- Estilo para modo CSS (offset-path) ---
  const cssStyle = useMemo(() => {
    const delay = -((offset / 100) * speed);
    return {
      // COMILLAS DOBLES -> Safari
      offsetPath: `path("${pathD}")`,
      WebkitOffsetPath: `path("${pathD}")`,
      offsetPosition: "0 0",
      WebkitOffsetPosition: "0 0",

      animationName: "travel",
      WebkitAnimationName: "travel",
      animationDuration: `${speed}s`,
      WebkitAnimationDuration: `${speed}s`,
      animationDelay: `${delay}s`,
      WebkitAnimationDelay: `${delay}s`,
      animationTimingFunction: "linear",
      WebkitAnimationTimingFunction: "linear",
      animationIterationCount: "infinite",
      WebkitAnimationIterationCount: "infinite",
      animationPlayState: (paused || reducedMotion) ? "paused" : "running",
      WebkitAnimationPlayState: (paused || reducedMotion) ? "paused" : "running",

      offsetDistance: "0%",
      WebkitOffsetDistance: "0%",
      offsetRotate: rotateWithPath ? "auto" : "0deg",
      WebkitOffsetRotate: rotateWithPath ? "auto" : "0deg",

      position: "absolute",
      top: 0,
      left: 0,
      width: `${size}px`,
      height: `${size}px`,
      willChange: "transform, offset-distance, -webkit-offset-distance",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
    };
  }, [pathD, offset, speed, paused, reducedMotion, rotateWithPath, size]);

  // --- Fallback JS (requestAnimationFrame + getPointAtLength) ---
  useEffect(() => {
    if (!useJs) return;
    const el = wrapRef.current;
    if (!el) return;

    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", pathD);
    svg.style.position = "absolute";
    svg.style.left = "-9999px";
    svg.style.top = "-9999px";
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
    svg.appendChild(path);
    document.body.appendChild(svg);

    const total = path.getTotalLength();
    const pxPerMs = total / (speed * 1000);
    let raf = 0, start = performance.now();
    const phase0 = (offset % 100) / 100;

    const step = (t) => {
      const pausedNow = paused || (respectReducedMotion && reducedMotion);
      if (pausedNow) { raf = requestAnimationFrame(step); return; }

      const progress = ((t - start) * pxPerMs) / total + phase0;
      const u = (progress % 1 + 1) % 1;
      const dist = u * total;

      const p = path.getPointAtLength(dist);
      let transform = `translate(${p.x}px, ${p.y}px)`;
      if (rotateWithPath) {
        const p2 = path.getPointAtLength((dist + 0.01) % total);
        const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;
        transform += ` rotate(${angle}deg)`;
      }
      el.style.transform = transform;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      svg.remove();
    };
  }, [useJs, pathD, speed, offset, rotateWithPath, paused, reducedMotion, respectReducedMotion]);

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noreferrer" } : { tabIndex: 0 };

  return (
    <Wrapper
      ref={wrapRef}
      className="icon-on-path outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded-xl"
      style={useJs ? {
        position: "absolute", top: 0, left: 0,
        width: `${size}px`, height: `${size}px`,
        willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden",
      } : cssStyle}
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
        <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 px-2 py-0.5 text-[11px] rounded bg-black/60 text-white whitespace-nowrap" aria-hidden="true">
          {name}
        </span>
      )}
    </Wrapper>
  );
}
