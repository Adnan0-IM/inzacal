import { Router } from "express";
import {
  getNotifications,
  updateNotification,
} from "../controller/notification.js";

const notificationsRouter = Router();

notificationsRouter.get("/", getNotifications);

notificationsRouter.post("/:id/read", updateNotification);

export { notificationsRouter };

