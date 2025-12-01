import type { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const getNotifications = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "User id is required" });
  const notifications = await prisma.notification.findMany({
    where: { OR: [{ userId }, { userId: null }] },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json(notifications);
};

export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ error: "Id is required" });
  await prisma.notification.update({
    where: { id },
    data: { readAt: new Date() },
  });
  res.json({ ok: true });
};
