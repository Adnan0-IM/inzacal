import { useContext } from "react";
import { AuthUIContext } from "@daveyplate/better-auth-ui";

export function useOrganization() {
  // Get active organization
  const { hooks } = useContext(AuthUIContext);
  const { data: activeOrg } = hooks.useActiveOrganization();

  // List all organizations
  const { data: organizations } = hooks.useListOrganizations();

  // Check permissions
  const { data: hasPermission } = hooks.useHasPermission({
    permissions: {
      organization: ["update"],
      member: ["create", "delete"],
    },
  });
  return { activeOrg, organizations, hasPermission };
}
