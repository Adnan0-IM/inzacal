import { nextCookies } from "better-auth/next-js";
import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

export const corsRouter = Router();
// Allowed origins: same-origin or provided via env
const allowedList = [
  "http://localhost:5173",
  process.env.APP_CLIENT_URL, // e.g. https://inzacal.vercel.app
  process.env.PUBLIC_ORIGIN, // optional alias
  process.env.BETTER_AUTH_URL, // optional
].filter((v): v is string => Boolean(v));

const allowed = new Set(allowedList);

const cors = async (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;
  const selfOrigin = `${req.protocol}://${req.get("host")}`;

  const isAllowed = !origin || origin === selfOrigin || allowed.has(origin);
  if (isAllowed) {
    res.header("Access-Control-Allow-Origin", origin ?? selfOrigin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, x-better-auth-csrf, better-auth-csrf",
    );
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  }
  return res.status(403).send(`Origin ${origin} not allowed by CORS`);
};

corsRouter.get("/", cors);
