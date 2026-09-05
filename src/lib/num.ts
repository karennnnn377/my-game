/* Localized numeral rendering — Persian & Arabic-Indic digits. */
import type { Lang } from "../i18n";

const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";

/** Convert Latin digits in a string to the language's native digits. */
export function digits(value: string | number, lang: Lang): string {
  const s = String(value);
  if (lang === "en") return s;
  const map = lang === "fa" ? FA : AR;
  return s.replace(/[0-9]/g, (d) => map[+d]);
}

/** Format a number with locale-appropriate digits + thousands separator. */
export function num(value: number, lang: Lang): string {
  const plain = value.toLocaleString("en-US");
  if (lang === "en") return plain;
  const map = lang === "fa" ? FA : AR;
  const sep = lang === "fa" ? "٬" : "٬";
  return plain.replace(/[0-9]/g, (d) => map[+d]).replace(/,/g, sep);
}
