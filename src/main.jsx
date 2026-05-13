import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  rootElement.innerHTML =
    `<div style="font-family: Arial, sans-serif; padding: 24px; color: #b91c1c;">
      <strong>React failed to start.</strong>
      <pre style="white-space: pre-wrap;">${message}</pre>
    </div>`;

  throw error;
}
