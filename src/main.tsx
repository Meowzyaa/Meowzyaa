import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Fonts are bundled rather than fetched from Google: the condensed headline is
// sized for Archivo, and a wide fallback would run it off the page.
import "@fontsource-variable/archivo/standard.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
