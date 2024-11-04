import { Prisma, PrismaClient } from "../generated/client/deno/edge.ts";
import { config } from "https://deno.land/std@0.163.0/dotenv/mod.ts";

const envVars = await config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});

const postData: Prisma.PostCreateInput[] = [
  {
    points: "13-21",
    bid: "1 of a suit",
    rcr: "≥ 5 card major suit; If no 5 card major then bid longer minor (If 3-3, bid 1C; if 4-4 then bid 1D)"
  },
  {
    points: "Rule of 20",
    bid: "For weaker hands, add the number of cards in your two longest suits to your HCP. If the total is 20 or more make a normal opening bid of 1 of a suit.",
    rcr: "❦Use this rule only on first and second seat. (that means your partner has not yet had a chance to bid)❦ Other restrictions as above."
  },
  {
    points: "15-17 HCP",
    bid: "(A) BH: 1NT(NF) (B) NBH: 1 of a suit(NF)",
    rcr: "(A)BH: No void, No singleton & No more than one doubleton.(B) Jump or reverse bid next with 16 or 17 HCP"
  },
];

/**
 * Seed the database.
 */

for (const u of postData) {
  const post = await prisma.post.create({
    data: u,
  });
  console.log(`Created post with id: ${post.id}`);
}
console.log(`Seeding finished.`);

await prisma.$disconnect();