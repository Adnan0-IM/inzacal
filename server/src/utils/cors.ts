import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

export const corsRouter = Router();

const allowedList = [
  "http://localhost:5173",
  "https://inzacal.vercel.app",
  process.env.APP_CLIENT_URL,
  process.env.PUBLIC_ORIGIN,
  process.env.BETTER_AUTH_URL,
].filter((v): v is string => Boolean(v));

const allowed = new Set(allowedList);

const cors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;
  const selfOrigin = `${req.protocol}://${req.get("host")}`;
  const isAllowed = !origin || origin === selfOrigin || allowed.has(origin);

  if (!isAllowed) {
    return res.status(403).send("Origin not allowed");
  }

  res.header("Access-Control-Allow-Origin", origin ?? selfOrigin);
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  const requestHeaders =
    (req.headers["access-control-request-headers"] as string | undefined) ??
    "Content-Type, Authorization, X-Requested-With, x-better-auth-csrf, better-auth-csrf";
  res.header("Access-Control-Allow-Headers", requestHeaders);

  // Optional: expose headers client may need
  // res.header("Access-Control-Expose-Headers", "Content-Type, Authorization");

  // Cache preflight for 10 minutes
  res.header("Access-Control-Max-Age", "600");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};

corsRouter.use(cors);
