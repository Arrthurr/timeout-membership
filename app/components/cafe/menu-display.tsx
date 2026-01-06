import { Clock, Info, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import {
  type CafeItem,
  formatPrice,
  getMemberPrice,
  getMemberSavings,
  CAFE_CATEGORIES,
} from "~/lib/constants/cafe";

interface MenuDisplayProps {
  items: CafeItem[];
  category: "coffee" | "spirits";
  showMemberPricing?: boolean;
  className?: string;
}

export function MenuDisplay({
  items,
  category,
  showMemberPricing = false,
  className,
}: MenuDisplayProps) {
  const categoryInfo = CAFE_CATEGORIES[category];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "coffee":
        return "border-barber-brown-300 bg-barber-brown-50";
      case "spirits":
        return "border-orange-300 bg-orange-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getItemTypeColor = (type?: string) => {
    switch (type) {
      case "hot":
        return "bg-red-100 text-red-800 border-red-200";
      case "cold":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "specialty":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case "all-day":
        return "text-barber-green-600";
      case "evening":
        return "text-orange-600";
      case "limited":
        return "text-amber-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">{categoryInfo.icon}</span>
          <h3 className="text-2xl font-bold text-primary">
            {categoryInfo.name}
          </h3>
        </div>
        <p className="text-muted-foreground">{categoryInfo.description}</p>
        <Badge variant="outline" className="mt-2 text-sm">
          {categoryInfo.availability}
        </Badge>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const memberPrice = getMemberPrice(item);
          const hasMemberDiscount =
            item.memberDiscount && item.memberDiscount > 0;

          return (
            <Card
              key={item.id}
              className={cn(
                "relative overflow-hidden hover:shadow-md transition-shadow duration-200",
                getCategoryColor(category)
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {item.icon && (
                        <span className="text-lg" aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      {item.type && (
                        <Badge
                          variant="outline"
                          className={cn("text-xs", getItemTypeColor(item.type))}
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {item.description}
                    </CardDescription>
                  </div>

                  <div className="text-right ml-4">
                    {showMemberPricing && hasMemberDiscount ? (
                      <div className="space-y-1">
                        <span className="text-sm text-muted-foreground line-through block">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-xl font-bold text-barber-green-600">
                          {formatPrice(memberPrice)}
                        </span>
                        <span className="text-xs text-barber-green-600 font-medium block">
                          Member Price
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-barber-brown-800">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2">
                  {/* Alcohol Content (Spirits Only) */}
                  {item.alcoholContent && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Info className="w-3 h-3" />
                      <span>{item.alcoholContent}</span>
                    </div>
                  )}

                  {/* Availability */}
                  {item.availability && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={getAvailabilityColor(item.availability)}>
                        {item.availability === "all-day" && "Available all day"}
                        {item.availability === "evening" && "Evening only"}
                        {item.availability === "limited" &&
                          "Limited availability"}
                      </span>
                    </div>
                  )}

                  {/* Member Savings */}
                  {hasMemberDiscount && !showMemberPricing && (
                    <div className="mt-3 p-2 bg-barber-green-100 border border-barber-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-barber-green-600" />
                        <span className="text-sm font-medium text-barber-green-800">
                          Members {getMemberSavings(item)}!
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-8">
          <div className="text-3xl mb-2">{categoryInfo.icon}</div>
          <p className="text-muted-foreground">
            No {categoryInfo.name.toLowerCase()} items available at this time.
          </p>
        </div>
      )}
    </div>
  );
}

