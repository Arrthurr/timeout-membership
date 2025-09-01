import { SignUp } from "@clerk/react-router";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Join Our Community | Timeout At Shannon's" },
    { name: "description", content: "Become a member of Timeout At Shannon's and enjoy exclusive benefits" },
  ];
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-brown-50 via-background to-barber-brown-100 flex flex-col">
      {/* Header with logo */}
      <div className="w-full p-6">
        <Link to="/" className="flex items-center space-x-3 text-primary hover:opacity-80 transition-opacity">
          <img 
            src="/images/barber-shop/timeout_logo_crop.png" 
            alt="Timeout At Shannon's Logo" 
            className="h-10 w-auto" 
          />
          <span className="text-xl font-bold">Timeout At Shannon's</span>
        </Link>
      </div>
      
      {/* Main sign-up area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          {/* Welcome message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Join Our Community</h1>
            <p className="text-muted-foreground">
              Create your account to enjoy member benefits, book appointments, and join the Timeout family.
            </p>
          </div>
          
          {/* Membership benefits preview */}
          <div className="bg-barber-brown-50 rounded-lg p-4 mb-6 border border-barber-brown-200">
            <h3 className="text-sm font-semibold text-barber-brown-800 mb-3 flex items-center gap-2">
              <span className="text-base">✂️</span> Member Benefits
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-barber-brown-600 rounded-full"></span>
                <span className="text-barber-brown-700">Service discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-barber-brown-600 rounded-full"></span>
                <span className="text-barber-brown-700">Priority booking</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-barber-brown-600 rounded-full"></span>
                <span className="text-barber-brown-700">Free bar drinks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-barber-brown-600 rounded-full"></span>
                <span className="text-barber-brown-700">Reward points</span>
              </div>
            </div>
          </div>
          
          {/* Clerk Sign Up Component */}
          <SignUp />
          
          {/* Additional links */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="text-sm text-barber-brown-600 hover:text-barber-brown-700 hover:underline transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full p-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 Timeout At Shannon's. All rights reserved.</p>
      </div>
    </div>
  );
}
