import ContentSection from "~/components/homepage/content";
import FathersDayPromo from "~/components/homepage/fathers-day-promo";
import Footer from "~/components/homepage/footer";
import Integrations from "~/components/homepage/integrations";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const title = "Timeout At Shannon's - Premium Barber Shop & Coffee Bar";
  const description =
    "Experience exceptional barber services in Chicago. Traditional cuts, hot shaves, coffee bar, and community spirit. Supporting local youth through the :20 Second Timeout Foundation.";
  const keywords = "Chicago barber shop, premium haircuts, hot shaves, coffee bar, traditional barber, community foundation, :20 Second Timeout";
  const siteUrl = "https://timeoutatshanons.com/";
  const imageUrl = "/images/barber-chairs.jpg";

  return [
    { title },
    {
      name: "description",
      content: description,
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:url", content: siteUrl },
    { property: "og:site_name", content: "Timeout At Shannon's" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    { name: "twitter:image", content: imageUrl },
    {
      name: "keywords",
      content: keywords,
    },
    { name: "author", content: "Shannon Jones" },
    { name: "favicon", content: imageUrl },
  ];
}

export default function Home() {
  return (
    <>
      <Integrations />
      <FathersDayPromo />
      <ContentSection />
      <Footer />
    </>
  );
}
