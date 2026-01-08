import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { authorized } from "./middleware/auth.js";
import { analyticsRouter } from "./routes/analytics.js";
import { productsRouter } from "./routes/products.js";
import { salesRouter } from "./routes/sales.js";
import { expensesRouter } from "./routes/expenses.js";
import { customersRouter } from "./routes/customers.js";
import { locationsRouter } from "./routes/locations.js";
import { fxRouter } from "./routes/fx.js";
import { notificationsRouter } from "./routes/notifications.js";
import { reportsRouter } from "./routes/reports.js";
import { corsRouter } from "./utils/cors.js";
import { syncPolicyFeed } from "./jobs/policyFeed.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

// Secure cookies behind Railway proxy
app.set("trust proxy", 1);

// CORS for API only
app.use("/api", corsRouter);

app.use(express.json());
app.use(express.static("public"));

// Better Auth
app.use("/api/auth/", toNodeHandler(auth));

// Protected (needs active organization)
app.use("/api/analytics", authorized, analyticsRouter);
app.use("/api/products", authorized, productsRouter);
app.use("/api/sales", authorized, salesRouter);
app.use("/api/expenses", authorized, expensesRouter);
app.use("/api/customers", authorized, customersRouter);
app.use("/api/locations", authorized, locationsRouter);
app.use("/api/fx", authorized, fxRouter);
app.use("/api/notifications", authorized, notificationsRouter);
app.use("/api/reports", authorized, reportsRouter);

// Health
app.get("/health", (_, res) => {
  res.status(200).json({ status: "Ok", timeStamp: new Date() });
});

// VERCEL FIX: Only listen on port and run background jobs if NOT on Vercel.
// On Vercel, the environment handles the port, and functions freeze after responses (killing intervals).
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
  });

  setInterval(syncPolicyFeed, 15 * 60 * 1000); // every 15 minutes
  syncPolicyFeed();
}

// For vercel
export default app;
