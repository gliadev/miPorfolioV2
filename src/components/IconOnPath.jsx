// src/components/IconOnPath.jsx
export default function IconOnPath({
  pathD,           // path SVG (string)
  icon,            // ruta o import del icono
  name,
  showLabel = true,
  speed = 22,      // segundos
  offset = 0,      // 0..100
  reverse = false, // alternate o alternate-reverse
  href,            // opcional
}) {
  const style = {
    offsetPath: `path('${pathD}')`,
    offsetDistance: `${offset}%`,
    animationDuration: `${speed}s`,
    animationDirection: reverse ? "alternate-reverse" : "alternate",
    WebkitOffsetPath: `path('${pathD}')`,
    WebkitOffsetDistance: `${offset}%`,
    WebkitAnimationDuration: `${speed}s`,
    WebkitAnimationDirection: reverse ? "alternate-reverse" : "alternate",
  };

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};

  return (
    <Wrapper className="icon-on-path" style={style} {...wrapperProps} aria-label={name} title={name}>
      <img
        src={icon}
        alt={name}
        className="w-12 h-12 object-contain bg-white/5 dark:bg-white/10 rounded-xl border border-white/10 shadow"
      />
      {showLabel && (
        <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 px-2 py-0.5 text-[11px] rounded bg-black/60 text-white whitespace-nowrap">
          {name}
        </span>
      )}
    </Wrapper>
  );
}
