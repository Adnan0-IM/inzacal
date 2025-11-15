import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { salesRouter } from "./sales.js";
import { productsRouter } from "./products.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = 3000;

// Behind Railway proxy; needed for Secure cookies + SameSite=None
app.set("trust proxy", 1);

const allowedOrigins = new Set<string>([
  "http://localhost:5173",
  "https://inzacal.vercel.app",
]);

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // SSR/healthchecks
    if (allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use("/api/auth/", toNodeHandler(auth));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/sales", salesRouter);

// ESM-safe __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "../../../../client/dist");
app.use(express.static(distPath));

const index = path.join(distPath, "index.html");

app.get("/health", (_, res) => {
  res.status(200).json({ status: "Ok", timeStamp: new Date() });
});

app.get("/", (_, res) => {
  res.sendFile(index);
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
