#!/usr/bin/env node
/**
 * Check-Links Agent
 * -----------------
 * Lee public/data/projects.json y comprueba el estado HTTP de cada URL
 * (github, website, store, demos). Reporta rotos, redirects y timeouts.
 *
 * Uso:
 *   node scripts/agents/check-links.js
 *   npm run check-links
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

// ── Colores ANSI (sin dependencias externas) ──────────────────────────────────
const clr = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  cyan:   "\x1b[36m",
  gray:   "\x1b[90m",
};
const bold   = (s) => `${clr.bold}${s}${clr.reset}`;
const dim    = (s) => `${clr.dim}${s}${clr.reset}`;
const green  = (s) => `${clr.green}${s}${clr.reset}`;
const yellow = (s) => `${clr.yellow}${s}${clr.reset}`;
const red    = (s) => `${clr.red}${s}${clr.reset}`;
const cyan   = (s) => `${clr.cyan}${s}${clr.reset}`;
const gray   = (s) => `${clr.gray}${s}${clr.reset}`;

// ── Configuración ─────────────────────────────────────────────────────────────
const TIMEOUT_MS = 8000;
const USER_AGENT = "Mozilla/5.0 (portfolio-check-links/1.0)";

// ── Comprobación de una URL ───────────────────────────────────────────────────
async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "manual",           // queremos ver redirects, no seguirlos
      headers: { "User-Agent": USER_AGENT },
    });
    clearTimeout(timer);

    return {
      status:     res.status,
      ok:         res.ok,                                          // 200-299
      redirect:   res.status >= 300 && res.status < 400,
      notFound:   res.status === 404,
      serverErr:  res.status >= 500,
    };
  } catch (err) {
    clearTimeout(timer);
    if (err.name === "AbortError") return { timeout: true };
    return { networkError: err.message };
  }
}

// ── Extrae todos los URLs de un proyecto ──────────────────────────────────────
function collectUrls(project) {
  const links = project.links || {};
  const entries = [];

  if (links.github)  entries.push({ label: "github",  url: links.github });
  if (links.website) entries.push({ label: "website", url: links.website });
  if (links.store)   entries.push({ label: "store",   url: links.store });

  (links.demos || []).forEach((url, i) => {
    if (url) entries.push({ label: `demo[${i}]`, url });
  });

  return entries;
}

// ── Formatea una línea de resultado ──────────────────────────────────────────
function formatLine(label, url, result) {
  const pad = label.padEnd(10);

  // Rutas locales (empiezan por /) — solo comprobables con servidor activo
  if (url.startsWith("/") || url.startsWith("./")) {
    return `  ${gray("·")}  ${gray(pad)} ${gray(url)}  ${gray("← local (no comprobable sin servidor)")}`;
  }

  if (result.timeout) {
    return `  ${yellow("⏱")}  ${yellow(pad)} ${url}  ${yellow("← timeout (>" + TIMEOUT_MS / 1000 + "s)")}`;
  }

  if (result.networkError) {
    return `  ${red("💀")} ${red(pad)} ${url}  ${red("← sin respuesta: " + result.networkError)}`;
  }

  if (result.ok) {
    return `  ${green("✅")} ${green(pad)} ${dim(url)}  ${green("← " + result.status)}`;
  }

  if (result.redirect) {
    return `  ${yellow("↪")}  ${yellow(pad)} ${url}  ${yellow("← " + result.status + " redirect")}`;
  }

  if (result.notFound) {
    return `  ${red("❌")} ${red(pad)} ${url}  ${red("← 404 NOT FOUND")}`;
  }

  if (result.serverErr) {
    return `  ${red("🔥")} ${red(pad)} ${url}  ${red("← " + result.status + " server error")}`;
  }

  return `  ${yellow("?")}  ${yellow(pad)} ${url}  ${yellow("← " + result.status)}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // Leer projects.json
  const jsonPath = join(ROOT, "public/data/projects.json");
  let projects;

  try {
    projects = JSON.parse(readFileSync(jsonPath, "utf-8"));
  } catch (err) {
    console.error(red(`\n❌ No se pudo leer projects.json: ${err.message}`));
    process.exit(1);
  }

  // Filtrar proyectos que tengan al menos un URL
  const withLinks = projects.filter((p) => collectUrls(p).length > 0);

  console.log(`\n${bold("🔍  Check-Links Agent")}`);
  console.log(dim(`    Comprobando ${withLinks.length} proyectos — ${new Date().toLocaleString("es-ES")}\n`));

  const stats = { ok: 0, redirect: 0, error: 0, timeout: 0, local: 0 };
  const broken = []; // acumula los problemáticos para el resumen final

  for (const project of withLinks) {
    const entries = collectUrls(project);
    console.log(bold(cyan(`▸ ${project.title}`)));

    for (const { label, url } of entries) {
      // Rutas locales: no se puede hacer fetch sin servidor
      if (url.startsWith("/") || url.startsWith("./")) {
        console.log(formatLine(label, url, {}));
        stats.local++;
        continue;
      }

      const result = await checkUrl(url);
      console.log(formatLine(label, url, result));

      if (result.timeout)      { stats.timeout++; broken.push({ project: project.title, label, url, reason: "timeout" }); }
      else if (result.networkError) { stats.error++;   broken.push({ project: project.title, label, url, reason: result.networkError }); }
      else if (result.ok)      { stats.ok++; }
      else if (result.redirect){ stats.redirect++; }
      else                     { stats.error++; broken.push({ project: project.title, label, url, reason: `HTTP ${result.status}` }); }
    }

    console.log(); // espacio entre proyectos
  }

  // ── Resumen ─────────────────────────────────────────────────────────────────
  console.log("─".repeat(55));
  console.log(bold("  Resumen"));
  console.log(`  ${green("✅  OK")}           ${stats.ok}`);
  if (stats.redirect > 0) console.log(`  ${yellow("↪   Redirects")}   ${stats.redirect}`);
  if (stats.error   > 0) console.log(`  ${red("❌  Errores")}      ${stats.error}`);
  if (stats.timeout > 0) console.log(`  ${yellow("⏱   Timeouts")}    ${stats.timeout}`);
  if (stats.local   > 0) console.log(`  ${gray("·   Locales")}      ${stats.local} ${gray("(sin servidor)")}`);

  if (broken.length > 0) {
    console.log(`\n${bold(red("  ⚠️  Links con problemas:"))} `);
    broken.forEach(({ project, label, url, reason }) => {
      console.log(`  ${red("•")} ${bold(project)} › ${label}`);
      console.log(`    ${dim(url)}`);
      console.log(`    ${red("→ " + reason)}`);
    });
    console.log();
    process.exit(1); // exit code 1 → útil en CI para fallar el pipeline
  } else {
    console.log(green(`\n  ✨ Todo OK — ningún link roto.\n`));
  }
}

main().catch((err) => {
  console.error(red(`\nError inesperado: ${err.message}`));
  process.exit(1);
});
