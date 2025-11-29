import { Resend } from "resend";
const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const FROM_EMAIL = process.env.RESEND_FROM ?? "onboarding@resend.dev";
export const SITE_NAME = process.env.SITE_NAME ?? "Inzacal";
export const EMAIL_DELIVERY_DISABLED =
  process.env.EMAIL_DELIVERY_DISABLED === "1" ||
  process.env.NODE_ENV !== "production";
