import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { matchPath, NavLink, useLocation } from "react-router";
import type { NavItem } from "@/config/nav";

export function NavMain({
  items,
}: {
  items: {
    id: string;
    label: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: NavItem[];
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Inzacal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Auto-open group if any child route matches
          const groupActive = item.items?.some((si) =>
            matchPath({ path: si.to as string, end: false }, location.pathname)
          );

          return (
            <Collapsible
              key={item.id}
              asChild
              defaultOpen={item.isActive ?? !!groupActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.label}
                    isActive={!!groupActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.label}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const active = !!matchPath(
                        { path: subItem.to as string, end: true },
                        location.pathname
                      );
                      return (
                        <SidebarMenuSubItem key={subItem.id}>
                          {/* Pass isActive so built-in styles apply */}
                          <SidebarMenuSubButton asChild isActive={active}>
                            <NavLink to={subItem.to}>
                              <span>{subItem.label}</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
