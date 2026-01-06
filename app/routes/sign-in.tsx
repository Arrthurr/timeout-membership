import { SignIn } from "@clerk/react-router";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Sign In | Timeout At Shannon's" },
    { name: "description", content: "Sign in to your Timeout At Shannon's membership account" },
  ];
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-brown-50 via-background to-barber-brown-100 flex flex-col">
      {/* Header with logo */}
      <div className="w-full p-6">
        <Link to="/" className="flex items-center space-x-3 text-primary hover:opacity-80 transition-opacity">
          <img 
            src="/images/timeout_logo_crop.png" 
            alt="Timeout At Shannon's Logo" 
            className="h-10 w-auto" 
          />
          <span className="text-xl font-bold">Timeout At Shannon's</span>
        </Link>
      </div>
      
      {/* Main sign-in area */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          {/* Welcome message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to access your membership benefits and book your next appointment.
            </p>
          </div>
          
          {/* Clerk Sign In Component */}
          <SignIn />
          
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
