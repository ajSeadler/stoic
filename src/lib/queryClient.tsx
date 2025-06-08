import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ① Create a single QueryClient instance:
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* ② Wrap your entire app in the provider: */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
