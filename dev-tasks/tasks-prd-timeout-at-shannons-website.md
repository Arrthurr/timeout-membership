# Tasks: Timeout At Shannon's Website

Based on `prd-timeout-at-shannons-website.md`

## Relevant Files

- `app/app.css` - Global styles and Tailwind customization for barber shop color scheme
- `tailwind.config.js` - Tailwind configuration for custom color palette
- `app/routes/home.tsx` - Homepage route transformation from SaaS to barber shop
- `app/components/homepage/navbar.tsx` - Navigation menu updates for barber shop sections
- `app/components/homepage/content.tsx` - Main homepage content refacing
- `app/components/homepage/pricing.tsx` - Adaptation for membership pricing display
- `app/components/homepage/footer.tsx` - Footer updates with barber shop information
- `app/routes/services.tsx` - New services route showcasing all barber services
- `app/components/services/service-card.tsx` - Individual service display component
- `app/components/services/booking-link.tsx` - External booking integration component
- `app/routes/bar.tsx` - New bar section route for coffee and spirits
- `app/components/bar/menu-display.tsx` - Bar offerings display component
- `app/routes/community.tsx` - Community events and foundation route
- `app/components/community/events-list.tsx` - Upcoming events display
- `app/components/community/foundation-info.tsx` - Foundation mission and info component
- `app/routes/about.tsx` - About Shannon Jones and shop history route
- `app/components/about/owner-bio.tsx` - Shannon Jones biography component
- `app/components/about/shop-history.tsx` - Shop founding story and history
- `app/routes/membership.tsx` - Enhanced membership route with tiers
- `app/components/membership/tier-cards.tsx` - Membership tier display components
- `app/components/membership/digital-wallet.tsx` - Digital wallet card component
- `app/components/dashboard/member-card.tsx` - Member dashboard digital card display
- `app/components/dashboard/points-display.tsx` - Points balance and rewards tracking
- `convex/services.ts` - Convex functions for barber services data
- `convex/events.ts` - Convex functions for community events
- `convex/memberPoints.ts` - Points accumulation and tracking system
- `public/images/barber-shop/` - Directory for barber shop imagery
- `app/lib/constants/services.ts` - Service definitions and pricing constants
- `app/lib/constants/colors.ts` - Brand color definitions
- `app/lib/utils/wallet-integration.ts` - Apple/Google Wallet integration utilities

### Notes

- Existing Convex authentication (Clerk) and subscription (Polar.sh) systems will be reused
- Current shadcn/ui components will be styled with new barber shop theme
- Mobile-first responsive design using existing Tailwind framework
- Routes will be added to existing `app/routes.ts` configuration

## Tasks

- [x] 1.0 Brand Identity & Color Scheme Implementation
- [x] 1.1 Create custom Tailwind color palette with warm browns, forest greens, steel grays, and burnt oranges
  - [x] 1.2 Update global CSS variables for consistent theming across components
  - [x] 1.3 Create brand color constants file for easy reference throughout the app
  - [x] 1.4 Update existing shadcn/ui component color mappings to use new palette

- [ ] 2.0 Homepage Refacing & Hero Section
  - [ ] 2.1 Replace current SaaS hero content with barber shop welcome message and call-to-action
  - [ ] 2.2 Add hero background imagery showcasing the barber shop atmosphere
  - [ ] 2.3 Create compelling membership sign-up call-to-action with benefits preview
  - [ ] 2.4 Design section previews for Services, Bar, Community, About, and Membership
  - [ ] 2.5 Update homepage content component with barber shop amenities highlights
  - [ ] 2.6 Implement smooth scrolling navigation to different homepage sections

- [ ] 3.0 Navigation & Menu System Updates
  - [ ] 3.1 Update navbar menu items from SaaS sections to barber shop sections
  - [ ] 3.2 Replace logo/branding with Timeout At Shannon's branding
  - [ ] 3.3 Update navigation links to point to new barber shop routes
  - [ ] 3.4 Maintain existing authentication integration with updated styling
  - [ ] 3.5 Add mobile-responsive navigation for new section structure

- [ ] 4.0 Services Section Creation
  - [ ] 4.1 Create services route and main services page layout
  - [ ] 4.2 Build service card component displaying name, sports theme, price, and description
  - [ ] 4.3 Implement all 10 services with proper pricing display ($35-$150 range)
  - [ ] 4.4 Add service duration estimates and what's included for each service
  - [ ] 4.5 Create external booking link component with clear call-to-action
  - [ ] 4.6 Design services grid layout with responsive design for mobile/desktop
  - [ ] 4.7 Add service filtering or categorization if beneficial for user experience

- [ ] 5.0 Bar Section Implementation
  - [ ] 5.1 Create bar route and main bar page layout
  - [ ] 5.2 Design coffee bar menu display with offerings and pricing
  - [ ] 5.3 Create select spirits menu section with available options
  - [ ] 5.4 Add atmospheric imagery showcasing the bar area
  - [ ] 5.5 Highlight bar as complementary amenity to barber services
  - [ ] 5.6 Implement responsive design for bar menu displays

- [ ] 6.0 Community Section & Foundation Feature
  - [ ] 6.1 Create community route with events and foundation sections
  - [ ] 6.2 Build upcoming events display component with date, time, and descriptions
  - [ ] 6.3 Implement :20 Second Timeout Foundation section with mission statement
  - [ ] 6.4 Add scholarship information for college-bound high school seniors
  - [ ] 6.5 Create events list component that can be easily updated
  - [ ] 6.6 Design foundation info component highlighting community impact

- [ ] 7.0 About Section Development
  - [ ] 7.1 Create about route showcasing Shannon Jones and shop history
  - [ ] 7.2 Build owner biography component with professional background
  - [ ] 7.3 Add shop founding story and historical timeline
  - [ ] 7.4 Include awards, recognition, and client testimonials section
  - [ ] 7.5 Highlight years of experience and training background
  - [ ] 7.6 Emphasize community involvement and shop values
  - [ ] 7.7 Add professional photography placeholders for Shannon and shop interior

- [ ] 8.0 Membership System Enhancement
  - [ ] 8.1 Update existing membership/pricing page for barber shop membership tiers
  - [ ] 8.2 Design membership tier cards showing monthly/annual options with 20% annual discount
  - [ ] 8.3 List membership benefits: discounted services, bar drinks, product access, points
  - [ ] 8.4 Integrate points accumulation system display in member dashboard
  - [ ] 8.5 Update subscription flow to accommodate barber shop membership tiers
  - [ ] 8.6 Enhance member dashboard with barber shop specific features

- [ ] 9.0 Digital Wallet Integration
  - [ ] 9.1 Research and implement Apple Wallet integration for membership cards
  - [ ] 9.2 Research and implement Google Wallet integration for membership cards
  - [ ] 9.3 Create digital membership card component with QR code functionality
  - [ ] 9.4 Display membership status, balance, and tier information on digital card
  - [ ] 9.5 Add service history tracking and points/rewards display
  - [ ] 9.6 Implement "Add to Wallet" buttons in member dashboard
  - [ ] 9.7 Test wallet integration across iOS and Android devices

- [ ] 10.0 Convex Backend Extensions
  - [ ] 10.1 Create services table and queries for barber service information
  - [ ] 10.2 Extend user schema to include member points and tier information
  - [ ] 10.3 Create events table and mutations for community events management
  - [ ] 10.4 Implement points accumulation system with Convex mutations
  - [ ] 10.5 Add member rewards tracking and redemption functionality
  - [ ] 10.6 Create queries for member dashboard data (points, history, benefits)
  - [ ] 10.7 Update subscription webhooks to handle barber shop membership tiers

- [ ] 11.0 Mobile Responsiveness & Testing
  - [ ] 11.1 Test all new sections on mobile devices for proper responsiveness
  - [ ] 11.2 Verify service pricing displays correctly on small screens
  - [ ] 11.3 Ensure navigation menu works properly on mobile devices
  - [ ] 11.4 Test digital wallet integration on actual iOS and Android devices
  - [ ] 11.5 Verify membership sign-up flow works seamlessly on mobile
  - [ ] 11.6 Test external booking link functionality across devices
  - [ ] 11.7 Optimize images and loading performance for mobile users
  - [ ] 11.8 Conduct cross-browser testing (Chrome, Safari, Firefox, Edge)
