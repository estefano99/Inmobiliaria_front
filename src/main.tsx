import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router />
  </ThemeProvider>
);
