import type { User } from "better-auth";
import {
  EMAIL_DELIVERY_DISABLED,
  FROM_EMAIL,
  resend,
  SITE_NAME,
} from "../../lib/resend.js";
import { emailVerification } from "../../templates/email/template.js";

export const verificationEmail = async (user: User, url: string) => {
  const name = user.name || user.email.split("@")[0];
  const email = user.email;

  if (EMAIL_DELIVERY_DISABLED || !resend) {
    console.warn(
      "Email delivery disabled in this environment; verification link:",
      url,
    );
    return;
  }

  try {
    const html = emailVerification(name, email, url, SITE_NAME);
    const result = await resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: user.email,
      subject: `Verify your ${SITE_NAME} email`,
      html,
    });
    if (result.error) {
      console.error("Resend error:", result.error);
      if (process.env.NODE_ENV === "production") {
        throw new Error(result.error.message || "Failed to queue email");
      } else {
        console.warn("Skipping email error in non-production.");
      }
    } else {
      console.log("Verification email queued. id:", result.data?.id);
    }
  } catch (err: any) {
    console.error("Failed to send verification email:", err);
    if (process.env.NODE_ENV === "production") throw err;
  }
};
