// src/components/MediaPreview.jsx
export default function MediaPreview({ src, alt = "", poster, className = "", width, height }) {
  const isVideo = /\.(mp4|webm)$/i.test(src);
  return isVideo ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className={className}
      width={width}
      height={height}
    />
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      width={width}
      height={height}
    />
  );
}
