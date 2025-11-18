import { NavLink, Outlet } from "react-router";
import PageHeader from "@/components/common/PageHeader";

export default function OrganizationLayout() {
  const tabs = [
    { to: "/organization/settings", label: "Settings" },
    { to: "/organization/members", label: "Members" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader title="Configuration" subtitle="Organization" />
      <nav className="flex gap-4 border-b">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              [
                "px-3 py-2 text-sm -mb-px border-b-2",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              ].join(" ")
            }
            end
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
