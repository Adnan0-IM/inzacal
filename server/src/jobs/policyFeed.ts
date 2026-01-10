import axios from "axios";
import { prisma } from "../lib/prisma.js";
import { CronJob } from "cron";

type PolicyItem = {
  id: string;
  title: string;
  body?: string;
  jurisdiction?: string;
  category?: string;
  effectiveFrom?: string;
  effectiveTo?: string | null;
  details?: string;
  links?: { title: string; url: string }[];
  publishedAt?: string;
};

export const syncPolicyFeed = new CronJob("*/15 * * * *", async () => {
  const url = process.env.POLICY_FEED_URL;
  if (!url) return;
  try {
    const r = await axios.get(url, { timeout: 10_000 });
    if (r.status !== 200) return;

    const data = r.data;
    const items: PolicyItem[] = Array.isArray(data)
      ? data
      : (data?.policies ?? []);
    if (!Array.isArray(items)) return;

    for (const it of items.slice(0, 50)) {
      const exists = await prisma.notification.findFirst({
        where: {
          type: "policy",
          payload: { path: ["id"], equals: it.id } as any,
        },
      });
      if (exists) continue;

      await prisma.notification.create({
        data: {
          type: "policy",
          payload: it as any,
        },
      });
    }
  } catch (e) {
    console.error("Policy sync failed:", e);
  }
});
