import { HomePage } from "@/components/site/home-page";
import { getSiteContent } from "@/lib/content/repository";

// Content is cached and refreshed on demand whenever the admin saves a change.
export const revalidate = 3600;

export default async function Home() {
  const content = await getSiteContent();
  return <HomePage content={content} />;
}
