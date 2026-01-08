import { CronJob } from "cron";
import axios from "axios";

const SELF_URL = "https://inzacal.onrender.com";

// 14 min cron → "*/14 * * * *"
export const keepAwakeJob = new CronJob(
  "*/14 * * * *",
  async () => {
    try {
      await axios.get(`${SELF_URL}/health`); // any lightweight route
      console.log("[keep-awake] ping sent");
    } catch (e) {
      console.error("[keep-awake] ping failed", e);
    }
  },
  null, // onComplete
  false, // start right away?
  "Etc/UTC", // timezone (optional)
);

// start when the server boots
keepAwakeJob.start();
