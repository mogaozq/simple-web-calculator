import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  rootElement.innerHTML =
    '<div style="font-family: Arial, sans-serif; padding: 24px; color: #b91c1c;">React failed to start. Open the browser console to see the error.</div>';
  throw error;
}
