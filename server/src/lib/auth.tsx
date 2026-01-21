import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization, twoFactor } from "better-auth/plugins";
import { prisma, initDB } from "./prisma.js";
import { verificationEmail } from "../services/email/verificationEmail.js";

// Kick off connection in background (handles cold-start/sleep)
initDB().catch((e) => {
  console.warn("DB init retrying later:", e?.code ?? e?.message ?? e);
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins: [
    "http://localhost:5173",
    "https://inzacal-production.up.railway.app",
    "https://inzacal.onrender.com",
    "https://inzacal.vercel.app",
  ],

  session: {
    cookieCache: { enabled: true },
  },

  advanced: {
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    },
  },

  plugins: [twoFactor(), organization()],
  user: {
    deleteUser: {
      enabled: true,
    },
    changeEmail: {
      enabled: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false
  },
  socialProviders:
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
          },
        }
      : {},
  emailVerification: {
    sendVerificationEmail: ({ user, url }) => verificationEmail(user, url),
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
  },
});
