import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { salesRouter } from "./sales.js";
import { productsRouter } from "./products.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT ?? 3000;

// Secure cookies behind Railway proxy
app.set("trust proxy", 1);

const allowedOrigins = new Set<string>([
  "http://localhost:5173",
  "https://inzacal.vercel.app",
  "https://inzacal-production.up.railway.app"
]);

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // health/SSR
    if (allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // include any headers Better Auth/client might send
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "x-better-auth-csrf",
    "better-auth-csrf",
  ],
  optionsSuccessStatus: 204,
};

// 1) Global CORS
app.use(cors(corsOptions));
// 2) Hard-set headers for all API routes (ensures Better Auth responses include them)
app.use("/api", (req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  if (origin && allowedOrigins.has(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
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
  }
  next();
});

app.use(express.json());

// Better Auth (no /api duplication in baseURL on the client)
app.use("/api/auth/", toNodeHandler(auth));

// Your APIs
app.use("/api/products", productsRouter);
app.use("/api/sales", salesRouter);

// Static (optional)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const distPath = path.join(__dirname, "../../../../client/dist");
const distPath = path.join(process.cwd(), "client/dist");
app.use(express.static(distPath));
const index = path.join(distPath, "index.html");

app.get("/health", (_, res) => {
  res.status(200).json({ status: "Ok", timeStamp: new Date() });
});


// Root + SPA fallback (serve index.html for any non-/api path)
app.get("/", (_, res) => {
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
