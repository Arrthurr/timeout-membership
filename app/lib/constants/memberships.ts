export interface Membership {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  tier?: "standard" | "premium";
  icon?: string;
}

export const ZENOTI_MEMBERSHIP_URL =
  "https://timeoutlounge.zenoti.com/webstoreNew/sales/membership/873658fa-44c6-4608-9402-09634ce4864c" as const;

export const MEMBERSHIPS: Membership[] = [
  {
    id: "season-ticket-holder",
    name: "The Season Ticket Holder",
    tagline: "Stay sharp for six months.",
    description:
      "You get **12 Timeout Called** cuts with Shannon — twice a month, all season long, one price.",
    tier: "standard",
    icon: "🎟️",
  },
  {
    id: "clean-sweep",
    name: "The Clean Sweep",
    description:
      "A full year of the **complete Full Timeout treatment.** Twenty-four sessions, our team barbers, one payment. If you want the best every time you sit down, this is your membership.",
    tier: "premium",
    icon: "🏆",
  },
  {
    id: "clean-sweep-premium",
    name: "The Clean Sweep PREMIUM",
    description:
      "A full year at the top of the menu. **Twenty-four That's A Close Call sessions with Shannon,** priority booking every visit, quarterly add-ons, and VIP simulator access. The cleanest sweep in the game.",
    tier: "premium",
    icon: "👑",
  },
];
