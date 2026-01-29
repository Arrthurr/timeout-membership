import { Link } from "react-router";

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-32 bg-barber-brown-50 dark:bg-background border-t border-barber-brown-200">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Link to="/" aria-label="go home" className="mx-auto block size-fit mb-6">
            <img 
              src="/images/timeout_logo_small.png" 
              alt="Timeout At Shannon's Logo" 
              className="h-16 w-auto mx-auto" 
            />
          </Link>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Timeout At Shannon's
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Chicago's premier barber shop experience - where tradition meets excellence, 
              and every visit supports our community through the :20 Second Timeout Foundation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
            <Link
              to="/services"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              to="/cafe"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Out of Bounds
            </Link>
            <Link
              to="#team"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="#pricing"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Membership
            </Link>
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Member Portal
            </Link>
          </div>

          <div className="border-t border-barber-brown-200 pt-6 mt-4">
            <span className="text-muted-foreground block text-center text-sm">
              © {new Date().getFullYear()} Timeout At Shannon's. All rights reserved.
            </span>
            <p className="text-xs text-muted-foreground mt-2">
              Building stronger communities, one timeout at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
