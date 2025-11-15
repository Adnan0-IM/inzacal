"use client";

import * as React from "react";
import { useMemo } from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { OrganizationSwitcher, UserButton } from "@daveyplate/better-auth-ui";
import { nav, filterNavByRole, type Role } from "@/config/nav";
import { useSession } from "@/features/auth/hooks/useSession";
import { useActiveOrganization } from "@/features/dashboard/hooks/useActiveOrganization";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: sessionData } = useSession();
  const activeOrg = useActiveOrganization();
  const userId = sessionData?.user?.id;
  const members = activeOrg?.members || [];

  const member = members.find((member) => member.userId === userId);
  const role = member?.role as Role | undefined;

  const groups = useMemo(() => filterNavByRole(nav, role), [role]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          size={"default"}
          side="right"
          align="start"
          hidePersonal
          classNames={{
            trigger: {
              base: "bg-sidebar text-sidebar-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-sidebar-accent-foreground shadow-none",
              avatar: {
                base: "size-8 bg-sidebar-primary text-sidebar-primary-foreground",
              },
            },
            content: {
              base: "w-80",
              menuItem: "gap-3",
            },
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={groups} />
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          side="right"
          align="start"
          classNames={{
            trigger: {
              base: "bg-sidebar text-sm truncate text-sidebar-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-sidebar-accent-foreground shadow-none",
              avatar: {
                base: "size-4 bg-sidebar-primary text-sidebar-primary-foreground",
              },
            },
            content: {
              base: "w-80 truncate",
              menuItem: "gap-3",
            },
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
