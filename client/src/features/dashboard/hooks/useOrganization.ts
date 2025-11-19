import { useContext } from "react";
import { AuthUIContext } from "@daveyplate/better-auth-ui";

export function useOrganization() {
  // Get active organization
  const { hooks } = useContext(AuthUIContext);
  const { data: activeOrg, isPending: isActiveOrgPending } = hooks.useActiveOrganization();

  // List all organizations
  const { data: organizations, isPending: isOrganizationsPending } = hooks.useListOrganizations();

  // Check permissions
  // const { data: hasPermission, isPending: isHasPermissionPending } = hooks.useHasPermission({
  //   permissions: {
  //     organization: ["update"],
  //     member: ["create", "delete"],
  //   },
  // });
  return { activeOrg, isActiveOrgPending, organizations, isOrganizationsPending };
}
