import { API_BASE_URL } from "@/config/constants";
import { api } from "@/lib/http";

const AUTH_BASE = `${API_BASE_URL}/auth`;

export type SessionResponse = {
  session: {
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: string;
    activeOrganizationId: null;
    id: string;
  };
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: null;
    createdAt: string;
    updatedAt: string;
    twoFactorEnabled: boolean;
    id: string;
  };
};

export async function getSession(): Promise<SessionResponse> {
  const res = await api.get(`${AUTH_BASE}/get-session`);
  return res.data;
}
