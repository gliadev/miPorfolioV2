import React, { useEffect, useState } from "react";

export default function IntroSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Llama a la función cuando se termina el tiempo
    }, 15000); // 15 segundos

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a23] text-white text-center p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-pulse">
        🚧 Portafolio en Construcción 🚧
      </h1>
      <p className="mb-4 max-w-xl">
        Estoy trabajando en una nueva versión. Mientras tanto, puedes visitar la versión anterior o ver mi perfil de LinkedIn.
      </p>
      <div className="flex gap-4">
        <a
          href="https://gliadev.github.io/miPorfolio/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver versión anterior
        </a>
        <a
          href="https://www.linkedin.com/in/gliadev/"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ir a LinkedIn
        </a>
      </div>
    </section>
  );
}
