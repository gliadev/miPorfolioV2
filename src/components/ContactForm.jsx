// src/components/ContactForm.jsx
import { useState } from "react";

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null;

const initialState = { name: "", email: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

const inputErrorClass =
  "w-full rounded-xl border border-red-400 dark:border-red-500 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors";

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  // Sin endpoint configurado → fallback mailto
  if (!FORMSPREE_URL) {
    return (
      <p className="text-center text-base">
        ¿Quieres conectar? Escríbeme a{" "}
        <a href="mailto:gliadev@icloud.com" className="text-blue-500 hover:underline">
          gliadev@icloud.com
        </a>
      </p>
    );
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio.";
    if (!form.email.trim()) {
      e.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Introduce un email válido.";
    }
    if (!form.message.trim()) e.message = "El mensaje no puede estar vacío.";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(initialState);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-6 py-8 text-center">
        <p className="text-lg font-semibold text-green-700 dark:text-green-300">
          ✅ ¡Mensaje enviado! Gracias por contactarme.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-zinc-500 hover:text-blue-500 transition-colors underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-md space-y-4">

      {/* Nombre */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
          className={errors.name ? inputErrorClass : inputClass}
        />
        {errors.name && (
          <p id="error-name" className="mt-1 text-xs text-red-500 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={errors.email ? inputErrorClass : inputClass}
        />
        {errors.email && (
          <p id="error-email" className="mt-1 text-xs text-red-500 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="¿En qué puedo ayudarte?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`resize-none ${errors.message ? inputErrorClass : inputClass}`}
        />
        {errors.message && (
          <p id="error-message" className="mt-1 text-xs text-red-500 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error de envío */}
      {status === "error" && (
        <p className="text-sm text-red-500 dark:text-red-400">
          ❌ Error al enviar. Inténtalo de nuevo o escríbeme a{" "}
          <a href="mailto:gliadev@icloud.com" className="underline">
            gliadev@icloud.com
          </a>.
        </p>
      )}

      {/* Honeypot — invisible para humanos, los bots lo rellenan y Formspree descarta el envío */}
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
