import { getSiteContent } from "@/lib/content/repository";
import { isActiveOn, mexicoToday } from "@/lib/content/schedule";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  // Only promotions published in the admin panel and active today (Mexico City time).
  const today = mexicoToday();
  const promotions = content.promotions
    .filter((p) => isActiveOn(p, today))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return <HomeClient content={{ ...content, promotions }} />;
}
