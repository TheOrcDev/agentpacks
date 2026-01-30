import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { agentPacks } from "./schema";

// Run with: npx tsx src/db/seed.ts

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const PACKS = [
  {
    slug: "content-creator",
    name: "Content Creator Pack",
    description: "AI agents for content creators - planner, writer, and social manager",
    icon: "🎬",
    filePath: "./packs-source/downloads/content-creator.zip",
    version: "1.0.0",
  },
  {
    slug: "dev-team",
    name: "Dev Team Pack",
    description: "AI agents for developers - engineering lead, code reviewer, and docs writer",
    icon: "⚔️",
    filePath: "./packs-source/downloads/dev-team.zip",
    version: "1.0.0",
  },
  {
    slug: "solopreneur",
    name: "Solopreneur Pack",
    description: "AI agents for indie hackers - assistant, researcher, and outreach specialist",
    icon: "🚀",
    filePath: "./packs-source/downloads/solopreneur.zip",
    version: "1.0.0",
  },
];

async function seed() {
  console.log("Seeding agent packs...");

  for (const pack of PACKS) {
    await db
      .insert(agentPacks)
      .values(pack)
      .onConflictDoUpdate({
        target: agentPacks.slug,
        set: {
          name: pack.name,
          description: pack.description,
          icon: pack.icon,
          filePath: pack.filePath,
          version: pack.version,
          updatedAt: new Date(),
        },
      });
    console.log(`  ✓ ${pack.name}`);
  }

  console.log("Done!");
}

seed().catch(console.error);
