import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "@/db";
import { accounts, sessions, users, verifications } from "@/db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      verification: verifications,
      account: accounts,
    },
  }),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const senderName = process.env.EMAIL_SENDER_NAME ?? "AgentPacks";
        const senderAddress =
          process.env.EMAIL_SENDER_ADDRESS ?? "noreply@orcdev.com";

        const appUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
        const logoUrl = `${appUrl.replace(/\/$/, "")}/agent-packs-logo.png`;

        const { error } = await resend.emails.send({
          from: `${senderName} <${senderAddress}>`,
          to: email,
          subject: "Sign in to AgentPacks",
          html: `
            <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 12px 0;">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom: 16px;">
                <img src="${logoUrl}" width="36" height="36" alt="AgentPacks" style="border-radius: 10px;" />
                <h2 style="margin:0;">Sign in to AgentPacks</h2>
              </div>
              <p>Click the button below to sign in to your account:</p>
              <a href="${url}" style="display: inline-block; background: linear-gradient(to right, #a855f7, #ec4899); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Sign In
              </a>
              <p style="margin-top: 24px; color: #666; font-size: 14px;">
                This link expires in 10 minutes. If you didn't request this, you can ignore this email.
              </p>
            </div>
          `,
        });

        if (error) {
          console.error("Failed to send magic link email:", error);
          throw new Error("Failed to send magic link email");
        }
      },
    }),
  ],
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
