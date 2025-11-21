import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { salesRouter } from "./sales.js";
import { productsRouter } from "./products.js";
import authorized from "./middleware/auth.js";
import { analyticsRouter } from "./analytics.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

// Secure cookies behind Railway proxy
app.set("trust proxy", 1);

// Allowed origins: same-origin or provided via env
const allowedList = [
  "http://localhost:5173",
  process.env.APP_CLIENT_URL, // e.g. https://inzacal.vercel.app
  process.env.PUBLIC_ORIGIN, // optional alias
  process.env.BETTER_AUTH_URL, // optional
].filter((v): v is string => Boolean(v));

const allowed = new Set(allowedList);

// CORS for API only
app.use("/api", (req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  const selfOrigin = `${req.protocol}://${req.get("host")}`;

  const isAllowed = !origin || origin === selfOrigin || allowed.has(origin);
  if (isAllowed) {
    res.header("Access-Control-Allow-Origin", origin ?? selfOrigin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, x-better-auth-csrf, better-auth-csrf"
    );
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  }
  return res.status(403).send(`Origin ${origin} not allowed by CORS`);
});

// JSON body limit (adjust with JSON_BODY_LIMIT env, default 1mb). Large inline base64 images can exceed default.
const jsonLimit = process.env.JSON_BODY_LIMIT || "1mb";
app.use(express.json({ limit: jsonLimit }));

// Better Auth
app.use("/api/auth/", toNodeHandler(auth));

// APIs
app.use("/api/products", authorized, productsRouter);
app.use("/api/sales", authorized, salesRouter);
app.use("/api/analytics", authorized, analyticsRouter);
// app.use("/api/organizations", organizationsRouter);

// Health
app.get("/health", (_, res) => {
  res.status(200).json({ status: "Ok", timeStamp: new Date() });
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
