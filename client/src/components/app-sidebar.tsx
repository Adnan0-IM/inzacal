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
  useSidebar,
} from "@/components/ui/sidebar";
import { OrganizationSwitcher, UserButton } from "@daveyplate/better-auth-ui";
import { nav, filterNavByRole, type Role } from "@/config/nav";
import { useSession } from "@/features/auth/hooks/useSession";
import { useOrganization } from "@/features/auth/hooks/useOrganization";
import { Home } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: sessionData } = useSession();
  const { activeOrg } = useOrganization();
  const userId = sessionData?.user?.id;
  const members = activeOrg?.members || [];

  const member = members.find((member) => member.userId === userId);
  const role = member?.role as Role | undefined;

  const groups = useMemo(() => filterNavByRole(nav, role), [role]);

  const { open, setOpen, isMobile } = useSidebar();
  const HomeIcon = (): React.ReactNode => <Home className="size-4" />;

  // Handle hover state to expand/collapse sidebar
  const handleMouseEnter = () => {
    if (!open && !isMobile) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (open && !isMobile) {
      // setOpen(false);
    }
  };

  // Add Home link at the top of the sidebar
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          size={open ? "default" : "icon"}
          side={isMobile ? "bottom" : "right"}
          align="start"
          hidePersonal
          autoFocus={true}
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
      <SidebarContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavMain items={groups} />
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          side={isMobile ? "top" : "right"}
          size={open ? "default" : "icon"}
          additionalLinks={[
            {
              href: "/",
              label: "Home",
              icon: <HomeIcon />,
              separator: false,
              signedIn: true,
            },
          ]}
          classNames={{
            trigger: {
              base: "bg-sidebar text-sm truncate text-sidebar-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:text-sidebar-accent-foreground shadow-none",
              avatar: {
                base: "size-8 bg-sidebar-primary text-sidebar-primary-foreground",
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
