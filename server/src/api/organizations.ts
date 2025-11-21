// import { Router } from "express";
// import sessionOnly from "./middleware/session.js";
// import { prisma } from "../lib/prisma.js";

// export const organizationsRouter = Router();

// // Create organization
// organizationsRouter.post("/", sessionOnly, async (req, res) => {
//   const user = (req as any).user as { id: string } | undefined;
//   if (!user) return res.status(401).json({ error: "Unauthorized" });

//   const {
//     name,
//     slug,
//     currency,
//     address,
//     taxId,
//     phone,
//     website,
//     industry,
//     timezone = "UTC",
//     fiscalYearStart,
//     logo,
//   } = req.body ?? {};

//   if (!name || !slug || !currency || !address) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const existing = await prisma.organization.findUnique({ where: { slug } });
//     if (existing) {
//       return res.status(409).json({ error: "Slug already in use" });
//     }

//     // Basic logo size/type validation (base64 data URL). Reject extremely large inline images.
//     if (logo) {
//       const maxBytes = 400 * 1024; // ~400KB limit for base64 length heuristic
//       // Rough size: base64 length * (3/4)
//       const approxBytes = Math.round((logo.length * 3) / 4);
//       if (approxBytes > maxBytes) {
//         return res.status(413).json({ error: "Logo too large (max ~400KB)." });
//       }
//       if (!logo.startsWith("data:image")) {
//         return res
//           .status(400)
//           .json({ error: "Logo must be a data:image URL." });
//       }
//     }

//     const org = await prisma.organization.create({
//       data: {
//         id: crypto.randomUUID(),
//         name,
//         slug,
//         currency,
//         address,
//         taxId,
//         phone,
//         website,
//         industry,
//         timezone,
//         fiscalYearStart: fiscalYearStart ? Number(fiscalYearStart) : null,
//         logo,
//         createdAt: new Date(),
//       },
//     });

//     await prisma.member.create({
//       data: {
//         id: crypto.randomUUID(),
//         organizationId: org.id,
//         userId: user.id,
//         role: "owner",
//         createdAt: new Date(),
//       },
//     });

//     res.status(201).json(org);
//   } catch (e: any) {
//     console.error("Create org error", e);
//     res.status(500).json({ error: "Failed to create organization" });
//   }
// });
