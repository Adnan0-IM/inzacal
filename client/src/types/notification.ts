export type Notification = {
  id: string;
  userId?: string | null;
  type: string;
  payload: unknown;
  createdAt: string;
  readAt?: string | null;
};
