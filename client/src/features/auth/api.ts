import { API_BASE_URL } from "@/config/constants";
import { api } from "@/lib/http";

const AUTH_BASE =
  `${API_BASE_URL}/auth`

export type User = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
};
export type Session = { user: User | null; expiresAt?: string | null };

// export type SessionResponse = {
// {
//     "session": {
//         "expiresAt": "2025-11-21T10:28:44.214Z",
//         "token": "XoOMBautpy2AuTlPusNQ8FzWS4DKLiUA",
//         "createdAt": "2025-11-14T10:28:44.214Z",
//         "updatedAt": "2025-11-14T10:28:44.214Z",
//         "ipAddress": "",
//         "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
//         "userId": "iy9rfSKvkLYmTeWIKAWpC10ChxoN26HH",
//         "activeOrganizationId": null,
//         "id": "r196MsFy7dXd2UiEupfdeswN3ypcVimn"
//     },
//     "user": {
//         "name": "Adnan Iliyasu",
//         "email": "adnanilyas969@gmail.com",
//         "emailVerified": false,
//         "image": null,
//         "createdAt": "2025-11-14T10:28:43.944Z",
//         "updatedAt": "2025-11-14T10:28:43.944Z",
//         "twoFactorEnabled": false,
//         "id": "iy9rfSKvkLYmTeWIKAWpC10ChxoN26HH"
//     }
// }

export async function getSession(): Promise<Session> {
  const res = await api.get(`${AUTH_BASE}/get-session`)
  return res.data;
}

