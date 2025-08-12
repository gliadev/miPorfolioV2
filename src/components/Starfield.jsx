const Starfield = ({ count = 40 }) => {
  const stars = Array.from({ length: count });

  return (
    <div className="starfield">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1; 
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 2 + Math.random() * 3;

        return (
          <div
            key={i}
            className="star"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Starfield;
