import { Link } from "react-router";
import { type ReactNode } from "react";
import { OrganizationSwitcher } from "@daveyplate/better-auth-ui";
import { Button } from "../ui/button";
import { Building2, UserPlus, Settings } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: { to: string; label: string; icon?: ReactNode };
  secondary?: { to: string; label: string };
  isFirstOrg?: boolean;
  // NEW: presentation controls
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
      <div className="relative overflow-hidden rounded-xl border bg-card p-8 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <ol className="mx-auto grid w-full gap-3 text-left sm:grid-cols-3">
            <li className="flex items-start gap-2 rounded-lg border bg-muted/30 p-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                1
              </span>
              <div className="text-sm">
                <div className="font-medium flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  Create organization
                </div>
                <p className="text-muted-foreground">Name, location, and currency</p>
              </div>
            </li>
            <li className="flex items-start gap-2 rounded-lg border bg-muted/30 p-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                2
              </span>
              <div className="text-sm">
                <div className="font-medium flex items-center gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Invite members
                </div>
                <p className="text-muted-foreground">Owners, sales, accounting</p>
              </div>
            </li>
            <li className="flex items-start gap-2 rounded-lg border bg-muted/30 p-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                3
              </span>
              <div className="text-sm">
                <div className="font-medium flex items-center gap-1.5">
                  <Settings className="h-4 w-4" />
                  Configure settings
                </div>
                <p className="text-muted-foreground">Taxes, roles, stock rules</p>
              </div>
            </li>
          </ol>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {action && (
              <OrganizationSwitcher
                trigger={
                  <Button size="lg" className="px-4">
                    {action.label}
                  </Button>
                }
              />
            )}
            {secondary && (
              <Link
                to={secondary.to}
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                {secondary.label}
              </Link>
            )}
          </div>
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
  const descClass = isCard ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground";

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