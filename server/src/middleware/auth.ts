import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  twoFactorEnabled: boolean | null | undefined;
};
declare global {
  namespace Express {
    interface Request {
      orgId?: string;
      user?: User;
    }
  }
}

async function authorized(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.session.activeOrganizationId) {
    return res
      .status(401)
      .json({ error: "Unauthorized or no active organaization" });
  }
  const orgId = session.session.activeOrganizationId;
  const user = session.user;
  req.orgId = orgId;
  req.user = user;

  next();
}

export const authorized;
