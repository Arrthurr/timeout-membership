import { Clock, Star, Users } from "lucide-react";
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
import { cn } from "~/lib/utils";
import { 
  BarberService, 
  formatPrice, 
  getMemberPrice,
  SERVICE_CATEGORIES 
} from "~/lib/constants/services";

interface ServiceCardProps {
  service: BarberService;
  showMemberPricing?: boolean;
  onBookService?: (serviceId: string) => void;
  className?: string;
}

export function ServiceCard({ 
  service, 
  showMemberPricing = false, 
  onBookService,
  className 
}: ServiceCardProps) {
  const category = SERVICE_CATEGORIES[service.category];
  const memberPrice = getMemberPrice(service);
  const hasMemberDiscount = service.memberDiscount && service.memberDiscount > 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'border-barber-brown-300 bg-barber-brown-50';
      case 'standard':
        return 'border-barber-green-300 bg-barber-green-50';
      case 'specialty':
        return 'border-orange-300 bg-orange-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'premium':
        return 'bg-barber-brown-100 text-barber-brown-800 border-barber-brown-200';
      case 'standard':
        return 'bg-barber-green-100 text-barber-green-800 border-barber-green-200';
      case 'specialty':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden hover:shadow-lg transition-shadow duration-300",
      getCategoryColor(service.category),
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              {service.icon && (
                <span className="text-2xl" aria-hidden="true">
                  {service.icon}
                </span>
              )}
              <Badge 
                variant="outline" 
                className={cn("text-xs font-medium", getBadgeColor(service.category))}
              >
                {category.name}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-tight">
              {service.name}
            </CardTitle>
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {service.sportsTheme}
            </CardDescription>
          </div>
          
          <div className="text-right ml-4">
            <div className="flex flex-col items-end">
              {showMemberPricing && hasMemberDiscount ? (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-2xl font-bold text-barber-green-600">
                    {formatPrice(memberPrice)}
                  </span>
                  <span className="text-xs text-barber-green-600 font-medium">
                    Member Price
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-barber-brown-800">
                  {formatPrice(service.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Duration */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{service.duration}</span>
        </div>

        {/* What's Included */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-barber-brown-800">
            What's Included:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {service.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="w-3 h-3 mt-0.5 text-barber-green-600 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Member Discount Badge */}
        {hasMemberDiscount && !showMemberPricing && (
          <div className="mt-4 p-2 bg-barber-green-100 border border-barber-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-barber-green-600" />
              <span className="text-sm font-medium text-barber-green-800">
                Members save ${service.memberDiscount}!
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          onClick={() => onBookService?.(service.id)}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          Book This Service
        </Button>
      </CardFooter>
    </Card>
  );
}
