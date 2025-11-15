import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { organization, twoFactor } from "better-auth/plugins";
import { Resend } from "resend";
import { emailVerification } from "../email/template.js";
const prisma = globalThis.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = prisma;
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const FROM_EMAIL = process.env.RESEND_FROM ?? "onboarding@resend.dev";
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
const SITE_NAME = process.env.SITE_NAME ?? "Inzacal";
const EMAIL_DELIVERY_DISABLED = process.env.EMAIL_DELIVERY_DISABLED === "1" ||
    process.env.NODE_ENV !== "production";
export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    trustedOrigins: [FRONTEND_URL],
    plugins: [twoFactor(), organization()],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
                prompt: "select_account",
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        }
        : {},
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            const name = user.name || user.email.split("@")[0];
            const email = user.email;
            if (EMAIL_DELIVERY_DISABLED || !resend) {
                console.warn("Email delivery disabled in this environment; verification link:", url);
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
                    // In production, surface the error; otherwise just warn
                    if (process.env.NODE_ENV === "production") {
                        throw new Error(result.error.message || "Failed to queue email");
                    }
                    else {
                        console.warn("Skipping email error in non-production.");
                    }
                }
                else {
                    console.log("Verification email queued. id:", result.data?.id);
                }
            }
            catch (err) {
                console.error("Failed to send verification email:", err);
                if (process.env.NODE_ENV === "production")
                    throw err;
            }
        },
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
    },
});
//# sourceMappingURL=auth.js.map