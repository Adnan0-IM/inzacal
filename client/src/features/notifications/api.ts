import { api } from "@/lib/http";
import type { Notification } from "@/types/notification";

export const fetchNotifications = async () => {
  const res = await api.get("/notifications");
  if (!res.data) throw new Error("Failed to fetch notifications");
  return res.data as Notification[];
};

export const markNotificationRead = async (id: string) => {
  const res = await api.post(`/notifications/${id}/read`);
  if (!res.data) throw new Error("Failed to mark as read");
  return res.data as { ok: boolean };
};
