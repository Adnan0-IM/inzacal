import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import "./index.css";
import App from "./app/App.tsx";
import { Providers } from "./app/providers/auth-ui.tsx";
import { ReactQueryProvider } from "./app/providers/react-query.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ReactQueryProvider>
        <Providers>
          <App />
        </Providers>
      </ReactQueryProvider>
    </Router>
  </StrictMode>
);
