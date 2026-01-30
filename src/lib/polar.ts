import "dotenv/config";
import { Polar } from "@polar-sh/sdk";

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error("POLAR_ACCESS_TOKEN is not set");
}

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
});

export const PRODUCT_ID =
  process.env.POLAR_PRODUCT_ID || "3f9a4196-0e98-484b-9d1e-262a328b1bc9";
