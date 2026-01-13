import {
  AlignHorizontalDistributeCenter,
  EggFried,
  UserCog,
  type LucideIcon,
} from "lucide-react";

export type Role =
  | "admin"
  | "owner"
  | "accountant"
  | "salesperson"
  | "investor";

export type NavItem = {
  id: string;
  label: string;
  to: string;
  roles?: Role[]; // if omitted = visible to all authenticated users
  children?: NavItem[]; // optional sub-items
};

export type NavGroup = {
  id: string;
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items: NavItem[];
};

export const nav: NavGroup[] = [
  {
    id: "core",
    label: "Core",
    icon: EggFried,
    isActive: true,
    items: [
      { id: "dashboard", label: "Dashboard", to: "/dashboard" },
      {
        id: "inventory",
        label: "Inventory",
        to: "/dashboard/inventory",
        roles: ["owner", "admin", "salesperson"],
      },
      {
        id: "sales",
        label: "Sales",
        to: "/dashboard/sales",
        roles: ["owner", "admin", "salesperson"],
      },
      {
        id: "expenses",
        label: "Expenses",
        to: "/dashboard/expenses",
        roles: ["owner", "admin", "accountant"],
      },
      {
        id: "investors",
        label: "Investors",
        to: "/dashboard/investors",
        roles: ["owner", "admin", "investor"],
      },
      {
        id: "reports",
        label: "Reports",
        to: "/dashboard/reports",
        roles: ["owner", "admin", "accountant"],
      },
      {
        id: "tax",
        label: "Tax Rules",
        to: "/dashboard/tax",
        roles: ["owner", "admin", "accountant"],
      },
      {
        id: "fx",
        label: "FX",
        to: "/dashboard/fx",
        roles: ["owner", "admin", "accountant"],
      },
      {
        id: "notifications",
        label: "Notifications",
        to: "/dashboard/notifications",
      },
    ],
  },
  {
    id: "org",
    label: "Organization",
    icon: AlignHorizontalDistributeCenter,
    isActive: true,
    items: [
      {
        id: "org-members",
        label: "Members",
        to: "/organization/members",
        roles: ["owner", "admin"],
      },
      {
        id: "org-settings",
        label: "Settings",
        to: "/organization/settings",
        roles: ["owner", "admin"],
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: UserCog,
    isActive: false,
    items: [
      { id: "account-settings", label: "Settings", to: "/account/settings" },
      {
        id: "organizations-settings",
        label: "Organizations",
        to: "/account/organizations",
      },
    ],
  },
];

export function canView(role: Role | undefined, item: NavItem): boolean {
  if (!item.roles) return !!role; // require auth if roles not specified
  if (!role) return false;
  return item.roles.includes(role);
}

export function filterNavByRole(groups: NavGroup[], role?: Role): NavGroup[] {
  if (!role) {
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => !i.roles),
      }))
      .filter((g) => g.label !== "Organization");
  }
  return groups
    .map((g) => ({
      ...g,
      items: g.items
        .filter((i) => canView(role, i))
        .map((i) =>
          i.children
            ? { ...i, children: i.children.filter((c) => canView(role, c)) }
            : i
        )
        .filter((i) => (i.children ? i.children.length > 0 : true)),
    }))
    .filter((g) => g.items.length > 0);
}
