import { ExternalLink, Calendar, Phone } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface BookingLinkProps {
  serviceId?: string;
  serviceName?: string;
  className?: string;
}

export function BookingLink({ serviceId, serviceName, className }: BookingLinkProps) {
  // TODO: Replace with actual booking system URL
  const bookingUrl = "https://booking.timeoutatshannons.com";
  
  const handleBookingClick = () => {
    // Track the booking click for analytics
    if (typeof window !== 'undefined') {
      // You can add analytics tracking here
      console.log(`Booking clicked for service: ${serviceId || 'general'}`);
    }
    
    // Open external booking system
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    // TODO: Replace with actual phone number
    window.location.href = 'tel:+1-312-555-0123';
  };

  return (
    <Card className={`border-barber-green-200 bg-barber-green-50 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-barber-green-800">
          <Calendar className="w-5 h-5" />
          Ready to Book Your Appointment?
        </CardTitle>
        <CardDescription className="text-barber-green-700">
          {serviceName 
            ? `Schedule your ${serviceName} appointment today`
            : "Choose your preferred time and get ready for the ultimate barber experience"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button
            onClick={handleBookingClick}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
            size="lg"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Book Online Now
          </Button>
          
          <Button
            onClick={handleCallClick}
            variant="outline"
            className="w-full border-barber-green-300 text-barber-green-800 hover:bg-barber-green-100 font-semibold py-3"
            size="lg"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call to Book: (312) 555-0123
          </Button>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-barber-green-200">
          <h4 className="font-semibold text-sm text-barber-green-800 mb-2">
            📅 Booking Information
          </h4>
          <ul className="text-sm text-barber-green-700 space-y-1">
            <li>• Online booking available 24/7</li>
            <li>• Same-day appointments when available</li>
            <li>• 24-hour cancellation policy</li>
            <li>• Walk-ins welcome (subject to availability)</li>
          </ul>
        </div>
        
        <div className="bg-barber-brown-50 rounded-lg p-4 border border-barber-brown-200">
          <h4 className="font-semibold text-sm text-barber-brown-800 mb-2">
            ⏰ Shop Hours
          </h4>
          <div className="text-sm text-barber-brown-700 space-y-1">
            <div className="flex justify-between">
              <span>Monday - Friday:</span>
              <span>9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span>8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span>10:00 AM - 4:00 PM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
