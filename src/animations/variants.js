/**
 * Variantes de Framer Motion compartidas entre componentes.
 * Importar lo que se necesite: import { fadeUp, fadeIn } from '../animations/variants';
 */

/** Aparece desde abajo — para tarjetas y secciones con animate */
export const fadeUp = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: 12, scale: 0.98 },
};

/** Aparece desde abajo al entrar en viewport — para Timeline cards */
export const fadeUpView = {
  initial:     { opacity: 0, y: 28, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport:    { once: true, amount: 0.2 },
};

/** Fade simple — para overlays y modales */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

/** Escala + fade — para botones flotantes */
export const scaleFade = {
  initial:  { opacity: 0, scale: 0.8 },
  animate:  { opacity: 1, scale: 1 },
  exit:     { opacity: 0, scale: 0.8 },
};

/** Transición por defecto rápida */
export const defaultTransition = { duration: 0.25 };

/** Transición para viewport (un poco más lenta) */
export const viewTransition = { duration: 0.45 };
