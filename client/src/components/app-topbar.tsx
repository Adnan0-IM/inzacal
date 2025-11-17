import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@daveyplate/better-auth-ui";

export function AppTopbar({ title }: { title?: string }) {
  return (
    <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="font-medium">{title}</div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserButton size="icon" />
      </div>
    </div>
  );
}
