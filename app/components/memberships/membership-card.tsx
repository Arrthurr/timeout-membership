import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type Membership,
  ZENOTI_MEMBERSHIP_URL,
} from "~/lib/constants/memberships";
import { cn } from "~/lib/utils";

interface MembershipCardProps {
  membership: Membership;
  className?: string;
}

const TIER_LABELS = {
  standard: "Season Pass",
  premium: "Annual Package",
} as const;

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function MembershipCard({ membership, className }: MembershipCardProps) {
  const getTierColor = (tier: Membership["tier"]) => {
    switch (tier) {
      case "premium":
        return "border-barber-brown-300 bg-barber-brown-50";
      case "standard":
        return "border-barber-green-300 bg-barber-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getBadgeColor = (tier: Membership["tier"]) => {
    switch (tier) {
      case "premium":
        return "bg-barber-brown-100 text-barber-brown-800 border-barber-brown-200";
      case "standard":
        return "bg-barber-green-100 text-barber-green-800 border-barber-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden hover:shadow-lg transition-shadow duration-300",
        getTierColor(membership.tier),
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="space-y-2">
          {membership.tier && (
            <div className="flex items-center gap-2">
              {membership.icon && (
                <span className="text-2xl" aria-hidden="true">
                  {membership.icon}
                </span>
              )}
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-medium",
                  getBadgeColor(membership.tier)
                )}
              >
                {TIER_LABELS[membership.tier]}
              </Badge>
            </div>
          )}
          <CardTitle className="text-xl leading-tight">
            {membership.name}
          </CardTitle>
          {membership.tagline && (
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {membership.tagline}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {renderBoldText(membership.description)}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          asChild
        >
          <a
            href={ZENOTI_MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Membership
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
