import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/hooks/useTheme";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return theme === "dark" ? (
    <Button onClick={() => setTheme("light")} variant="outline" size="icon">
      <Sun className="" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : theme === "light" ? (
    <Button onClick={() => setTheme("dark")} variant="outline" size="icon">
      <Moon className="" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  ) :
    <Button onClick={() => setTheme("dark")} variant="outline" size="icon">
      <Moon className="" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  
 
}
