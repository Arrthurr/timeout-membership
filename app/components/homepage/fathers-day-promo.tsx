import { Link } from "react-router";

const PROMO_IMAGE = "/images/fathers_day_recharge-2026.jpg";
const PROMO_IMAGE_2X = "/images/fathers_day_recharge-2026@2x.jpg";

const PROMO_ALT =
  "Father's Day Recharge Experience — Saturday, June 20, 2026, 12–5 PM at Timeout At Shannon's. Honor. Restore. Reconnect.";

export default function FathersDayPromo() {
  return (
    <section className="bg-background" aria-label="Father's Day promotion">
      <div className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <Link
          to="/contact"
          prefetch="viewport"
          className="block overflow-hidden rounded-xl shadow-lg transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <img
            src={PROMO_IMAGE}
            srcSet={`${PROMO_IMAGE} 1x, ${PROMO_IMAGE_2X} 2x`}
            alt={PROMO_ALT}
            width={2200}
            height={1707}
            className="h-auto w-full"
          />
        </Link>
      </div>
    </section>
  );
}
