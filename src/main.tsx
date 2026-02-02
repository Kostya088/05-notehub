import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize";
import "./index.css";
import App from "./components/App/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
