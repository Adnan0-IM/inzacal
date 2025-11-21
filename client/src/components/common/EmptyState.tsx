import { Link } from "react-router";
import { type ReactNode } from "react";
import { OrganizationSwitcher } from "@daveyplate/better-auth-ui";
import { Button } from "../ui/button";
import { Building2, Plus } from "lucide-react"; // Added Plus icon

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: { to: string; label: string; icon?: ReactNode };
  secondary?: { to: string; label: string };
  isFirstOrg?: boolean;
  variant?: "page" | "card";
  align?: "center" | "start";
};

export default function EmptyState({
  title,
  description,
  action,
  secondary,
  isFirstOrg = false,
  variant = "page",
  align = "center",
}: EmptyStateProps) {
  if (isFirstOrg) {
    return (
      <div className="flex min-h-[450px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted/20 shadow-sm ring-1 ring-border/50">
          <Building2 className="h-10 w-10 text-muted-foreground/60" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>

        {description && (
          <p className="mt-2 max-w-sm text-balance text-muted-foreground">
            {description}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          {action && (
            <OrganizationSwitcher
              trigger={
                <Button size="lg" className="gap-2">
                  <Plus className="h-4 w-4" />
                  {action.label}
                </Button>
              }
            />
          )}
          {secondary && (
            <Button variant="ghost" size="lg" asChild>
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Generic empty state
  const isCard = variant === "card";
  const containerClass = isCard
    ? // blend into Card content
      `py-4 ${align === "start" ? "text-left" : "text-center"}`
    : "rounded-lg border border-dashed p-8 text-center";
  const bodyClass = `mx-auto max-w-lg space-y-2 ${align === "start" ? "text-left" : "text-center"}`;
  const titleClass = isCard ? "text-sm font-medium" : "text-lg font-medium";
  const descClass = isCard
    ? "text-xs text-muted-foreground"
    : "text-sm text-muted-foreground";

  return (
    <div className={containerClass}>
      <div className={bodyClass}>
        <h2 className={titleClass}>{title}</h2>
        {description && <p className={descClass}>{description}</p>}
        {action && (
          <div className={isCard ? "pt-1" : "pt-2"}>
            {isCard ? (
              <Button asChild variant="outline" size="sm">
                <Link to={action.to}>
                  {action.icon}
                  {action.label}
                </Link>
              </Button>
            ) : (
              <Link
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                to={action.to}
              >
                {action.icon}
                {action.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
