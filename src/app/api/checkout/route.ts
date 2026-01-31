import { Checkout } from "@polar-sh/nextjs";

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error("POLAR_ACCESS_TOKEN is not set");
}

if (!process.env.NEXT_PUBLIC_SUCCESS_URL) {
  throw new Error("NEXT_PUBLIC_SUCCESS_URL is not set");
}

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.NEXT_PUBLIC_SUCCESS_URL,
});
