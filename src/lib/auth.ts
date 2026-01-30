import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "../db";
import * as schema from "../db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      verification: schema.verifications,
      account: schema.accounts,
    },
  }),
  emailAndPassword: {
    enabled: false, // Only magic link
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: "AgentPacks <noreply@agentpacks.dev>", // Update with your domain
          to: email,
          subject: "Sign in to AgentPacks",
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h2>Sign in to AgentPacks</h2>
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
      },
    }),
  ],
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
