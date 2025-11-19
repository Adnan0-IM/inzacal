import { ThemeProvider } from "@/components/theme-provider";
import AppRouter from "./router";

import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppRouter />
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
};

export default App;
