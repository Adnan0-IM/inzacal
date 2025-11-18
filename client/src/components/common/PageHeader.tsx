import {type ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  leading?: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={["flex items-center justify-between", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-2">
        <div>
          {subtitle && (
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          )}
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
