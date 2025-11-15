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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth/", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/sales", salesRouter);

// ESM-safe __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const distPath = path.join(__dirname, "../../../client/dist");

const distPath = path.join(__dirname, "../../../../client/dist");
app.use(express.static(distPath));

const index = path.join(distPath, "index.html");
console.log(index)
// Health check should be before the SPA catch‑all
app.get("/health", (_, res) => {
  res.status(200).json({ status: "Ok", timeStamp: new Date() });
});

// SPA fallback last
app.get("/", (_, res) => {
  res.sendFile(index);
});


app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});
