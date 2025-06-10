import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import router from "./Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
