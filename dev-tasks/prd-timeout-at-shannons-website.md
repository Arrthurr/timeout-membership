# Product Requirements Document: Timeout At Shannon's Website

## Introduction/Overview

This PRD outlines the refacing of the existing React Router v7 + Convex SaaS starter into a website for "Timeout At Shannon's," an upscale barber shop. The project will transform the current membership-based SaaS application into a barber shop website featuring services, bar amenities, community engagement, and membership offerings. This is a **view-layer refacing project only** - we will maintain the existing technical stack while completely redesigning the content, branding, and user experience to reflect an upscale barber shop aesthetic.

**Problem Statement**: The existing SaaS starter needs to be transformed into a professional barber shop website that showcases services, builds community, and drives membership sign-ups for Timeout At Shannon's.

**Goal**: Create a warm, inviting website using brown, green, steel, and orange color palette that serves both current customers and attracts new members to Timeout At Shannon's barber shop.

## Goals

1. **Increase Membership Sign-ups**: Convert website visitors into paying members through compelling value proposition and seamless sign-up process
2. **Build Brand Awareness**: Establish Timeout At Shannon's as a premium barber shop destination in the community
3. **Showcase Services**: Clearly present all barber services with sports-themed naming and transparent pricing
4. **Community Engagement**: Highlight the :20 Second Timeout Foundation and upcoming events
5. **Digital Experience**: Provide modern digital wallet integration and member benefits
6. **Professional Presentation**: Create a polished, upscale aesthetic that reflects the shop's quality

## User Stories

### Primary Users: Potential New Customers
- **As a** first-time visitor, **I want to** see all available services and pricing **so that** I can decide if this barber shop meets my needs
- **As a** potential customer, **I want to** understand the membership benefits **so that** I can decide if joining is worthwhile
- **As a** community member, **I want to** learn about upcoming events and the foundation **so that** I can participate in community activities

### Existing Customers
- **As an** existing customer, **I want to** easily book appointments through the external booking system **so that** I can schedule my next visit
- **As a** current member, **I want to** access my digital membership card **so that** I can use it for payments and track my benefits
- **As a** member, **I want to** see my points balance and available perks **so that** I can maximize my membership value

### Member Management
- **As a** prospective member, **I want to** sign up for either monthly or annual membership tiers **so that** I can choose the payment option that works best for me
- **As a** member, **I want to** manage my membership subscription **so that** I can update payment methods or change tiers

### Learning About the Business
- **As a** curious visitor, **I want to** read about Shannon Jones and the shop's history **so that** I can understand the expertise and story behind the business
- **As a** community-minded person, **I want to** learn about the :20 Second Timeout Foundation **so that** I can understand the shop's community impact

## Functional Requirements

### 1. Homepage (Index)
1.1. Display hero section with compelling call-to-action for membership sign-up
1.2. Provide overview/preview of all main sections (Services, Bar, Community, About, Membership)
1.3. Highlight key additional amenities the shop provides
1.4. Implement warm color scheme using brown, green, steel, and orange tones
1.5. Include clear navigation to all main sections

### 2. Services Section
2.1. Display all 10 services with sports-themed names and pricing:
- Overtime (complete service) $150
- His foot was on the line (locs/braids taper) $40
- Takes a close call (complete razor shave) $85
- Draft picks (kid's through high school) $35
- Rookies (undergraduate college students w/ ID) $40
- An official review (razor shave; beard trim) $50
- She got game (shear cut, shampoo; women only) $50
- A few good men (haircut, shave; veterans only) $40
- Jump ball (haircut, shave, shampoo, razor lining) $85
- Timeout called (haircut, beard trim, shampoo) $70

2.2. Include external booking system integration via link
2.3. Display service descriptions and what's included in each service
2.4. Show estimated duration for each service

### 3. Bar Section
3.1. Showcase coffee bar offerings
3.2. Display select spirits menu
3.3. Highlight bar as additional amenity for customers
3.4. Include atmosphere/ambiance imagery

### 4. Community Section
4.1. Display upcoming events calendar/listings
4.2. Feature :20 Second Timeout Foundation with provided mission statement:
   "It is our mission to make a difference in our communities by supporting the education of young people in Chicago. Investing in the education of our youth will create multiple positive results that will allow the younger generation to: 1. Become responsible adults who will have a positive impact on society. 2. Recognize the support that he or she has received while in school and reach back to empower other members of the community. 3. Help tip the balance of the socioeconomic status of the at-risk communities from poverty to progress and career fulfillment. It is our vision to support the endeavors of underserved youth and families by assisting and empowering them in the areas of education, quality of life, and professional development."
4.3. Provide information about scholarship opportunities for college-bound high school seniors

### 5. About Section
5.1. Present Shannon Jones' professional background and experience
5.2. Include shop founding story and history
5.3. Highlight awards, recognition, and client testimonials
5.4. Showcase years of experience and training background
5.5. Emphasize community involvement

### 6. Membership System
6.1. Offer tiered membership levels with both monthly and annual payment options
6.2. Provide 20% discount for annual payments
6.3. Display membership benefits including:
   - Discounted barber services
   - Discounted bar drinks  
   - Early access to upcoming products
   - Points accumulation system based on service payments
6.4. Enable membership sign-up and payment processing
6.5. Support membership management (change tiers, update payment methods)

### 7. Digital Wallet Integration
7.1. Generate digital membership cards compatible with Apple Wallet (iPhone)
7.2. Generate digital membership cards compatible with Google Wallet (Android)
7.3. Display membership status and current balance
7.4. Include QR code functionality for in-shop scanning
7.5. Show service history and accumulated points/rewards
7.6. Track membership tier and benefits

### 8. Technical Integration Requirements
8.1. Maintain existing React Router v7 + Convex + Clerk + Polar.sh architecture
8.2. Reuse existing authentication system (Clerk)
8.3. Leverage existing subscription management (Polar.sh integration)
8.4. Utilize existing Convex backend for member data
8.5. Keep existing Tailwind, shadcn/ui, and Radix UI component systems
8.6. Ensure mobile-responsive design across all sections

## Non-Goals (Out of Scope)

1. **No AI Chat Integration**: Focus on core features first, may add later
2. **No POS System Integration**: Payments for services handled in-shop, only membership payments online
3. **No Full Foundation Website**: Only basic info and mission statement, not complete foundation functionality
4. **No Appointment Booking System**: Use external third-party service via link only
5. **No Backend Architecture Changes**: Maintain existing Convex + Clerk + Polar.sh stack
6. **No New Component Libraries**: Use existing Tailwind, shadcn/ui, Radix setup
7. **No Advanced Analytics**: Standard web analytics only
8. **No Multi-location Support**: Single barber shop location only

## Design Considerations

### Color Palette
- **Primary Colors**: Warm browns, forest/sage greens, steel grays, burnt oranges
- **Aesthetic**: Upscale, warm, inviting, masculine but welcoming to all customers
- **Typography**: Professional yet approachable, easy to read pricing and service information

### UI/UX Requirements
- **Mobile-first responsive design** using existing Tailwind framework
- **Clear service pricing display** with no hidden costs
- **Intuitive navigation** between all major sections
- **Professional imagery** showcasing barber work and shop atmosphere  
- **Accessibility compliance** using existing Radix UI components
- **Fast loading times** with optimized images and content

### Component Reuse
- Leverage existing shadcn/ui components for consistency
- Adapt existing card layouts for service displays
- Reuse existing form components for membership sign-up
- Maintain existing button and navigation patterns

## Technical Considerations

### Architecture Constraints
- **Maintain Existing Stack**: React Router v7, Convex, Clerk, Polar.sh, Vercel deployment
- **Database Schema**: Extend existing user/subscription tables to include barber shop specific data
- **Authentication**: Reuse Clerk system for member accounts
- **Payment Processing**: Leverage existing Polar.sh integration for membership payments

### Integration Points
- **External Booking**: Simple link integration to third-party booking system
- **Digital Wallets**: Research Apple Wallet/Google Wallet integration options with existing tech stack
- **Convex Extensions**: Add queries/mutations for barber shop specific data (services, points, etc.)

### Performance Requirements
- **Maintain existing SSR performance** with React Router v7
- **Optimize images** for service showcases and about section
- **Ensure mobile responsiveness** across all new sections

### Data Requirements
- **Service Information**: Store service names, descriptions, prices, durations
- **Member Points**: Track points accumulation and redemption
- **Event Information**: Store and display upcoming community events
- **Foundation Content**: Static content for mission and information

## Success Metrics

### Primary Metrics
- **Membership Conversion Rate**: Target 5% of website visitors sign up for membership within 3 months
- **Membership Tier Distribution**: Track monthly vs annual membership selections
- **Digital Wallet Adoption**: Target 70% of members add card to digital wallet within 1 month

### Secondary Metrics
- **Booking Clicks**: Track external booking system link usage
- **Service Page Engagement**: Time spent on services section and most viewed services
- **Community Engagement**: Events section page views and foundation content engagement
- **Mobile Usage**: Ensure 60%+ mobile traffic has positive experience

### Business Impact
- **Revenue Growth**: Support membership revenue increase through improved conversion
- **Brand Recognition**: Improved professional online presence
- **Customer Retention**: Better member experience through digital tools

## Open Questions

### Technical Implementation
1. **Digital Wallet Integration**: What's the best approach for Apple/Google Wallet integration with current stack?
2. **Points System**: Should points be stored in Convex or integrated with Polar.sh subscription data?
3. **Image Assets**: Do we have professional photography of the shop, services, and Shannon Jones?
4. **Content Management**: How should event information be updated (admin interface vs manual updates)?

### Business Requirements  
5. **Membership Tiers**: What are the specific tier levels, pricing, and service allocations?
6. **External Booking**: What third-party booking system will be used?
7. **Payment Methods**: Beyond Polar.sh, any other payment options needed for membership?
8. **Member Communications**: Email notifications for points, renewals, events?

### Design & Content
9. **Brand Assets**: Logo files, official color codes, and brand guidelines?
10. **Professional Photos**: High-quality images of services, shop interior, Shannon Jones?
11. **Content Approval**: Who reviews and approves final copy for all sections?
12. **Legal Requirements**: Terms of service updates needed for barber shop vs SaaS model?
