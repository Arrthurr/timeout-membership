import { Button } from "~/components/ui/button";
import { ZENOTI_GIFT_CARDS_URL } from "~/lib/constants/zenoti";

export default function GiftCardBanner() {
  return (
    <section aria-label="Gift cards" className="py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-2xl font-semibold text-primary">Gift cards</h2>
        <p className="mt-2 text-muted-foreground">
          Cuts, shaves, and time in the lounge.
        </p>
        <Button className="mt-4" size="lg" asChild>
          <a
            href={ZENOTI_GIFT_CARDS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy a Gift Card
          </a>
        </Button>
      </div>
    </section>
  );
}
