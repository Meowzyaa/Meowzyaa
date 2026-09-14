import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// "14 SEP 2026", the way a label prints a release date. Built by hand because
// en-GB now abbreviates September as "Sept".
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const [year, month, day] = new Date()
  .toLocaleDateString("en-CA", { timeZone: "Asia/Almaty" })
  .split("-")
  .map(Number);
const buildDate = `${String(day).padStart(2, "0")} ${MONTHS[month - 1]} ${year}`;

export default defineConfig({
  base: "/",
  plugins: [react()],
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate)
  }
});
