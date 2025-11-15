import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { SERVER_URL } from "@/config/constants";

// Better Auth should target the server root (no /api)
export const authClient = createAuthClient({
  baseURL: SERVER_URL,
  plugins: [organizationClient()],
});
