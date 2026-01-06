export const FOUNDATION_INFO = {
  name: "20 Second Timeout Foundation",
  tagline: "Building Stronger Communities Through Connection and Care",
  mission: "The 20 Second Timeout Foundation is dedicated to fostering community wellness, supporting mental health awareness, and creating opportunities for meaningful connections in our local neighborhoods.",
  logo: "/images/20-Second-Timeout-logo.png",
  establishedYear: 2024,
  website: "https://20secondtimeout.org",
  email: "foundation@20secondtimeout.org",
  phone: "(555) 123-4567",
  address: {
    street: "123 Community Way",
    city: "Your City",
    state: "State",
    zipCode: "12345"
  }
} as const;

export const FOUNDATION_PROGRAMS = [
  {
    id: "youth-development",
    title: "Youth Development Initiative",
    description: "Supporting local youth through mentorship programs, skill-building workshops, and educational opportunities.",
    icon: "Users",
    highlights: [
      "Monthly mentorship sessions",
      "Life skills workshops",
      "Educational scholarships",
      "Leadership training programs"
    ],
    impact: "50+ youth served annually"
  },
  {
    id: "mental-health",
    title: "Mental Health Awareness",
    description: "Promoting mental wellness through education, resources, and community support networks.",
    icon: "Heart",
    highlights: [
      "Mental health first aid training",
      "Community support groups",
      "Wellness workshops",
      "Crisis intervention resources"
    ],
    impact: "200+ community members reached"
  },
  {
    id: "community-spaces",
    title: "Community Space Development",
    description: "Creating and maintaining welcoming spaces where neighbors can connect and build relationships.",
    icon: "Home",
    highlights: [
      "Community garden projects",
      "Neighborhood cleanup initiatives",
      "Public space improvements",
      "Community events coordination"
    ],
    impact: "15+ community spaces enhanced"
  },
  {
    id: "senior-support",
    title: "Senior Community Support",
    description: "Providing companionship, assistance, and resources for our senior community members.",
    icon: "Shield",
    highlights: [
      "Regular wellness check-ins",
      "Transportation assistance",
      "Technology support",
      "Intergenerational programs"
    ],
    impact: "75+ seniors supported monthly"
  }
] as const;

export const FOUNDATION_EVENTS = [
  {
    id: "annual-gala",
    title: "Annual Community Gala",
    date: "2024-10-15",
    time: "6:00 PM - 10:00 PM",
    location: "Downtown Convention Center",
    description: "Our signature fundraising event celebrating community achievements and raising funds for foundation programs.",
    ticketPrice: 75,
    status: "upcoming",
    category: "fundraiser",
    image: "/images/events/community-gala.jpg"
  },
  {
    id: "community-cleanup",
    title: "Spring Community Cleanup",
    date: "2024-04-20",
    time: "9:00 AM - 1:00 PM",
    location: "Various neighborhood locations",
    description: "Join us for a city-wide cleanup initiative to beautify our community spaces and parks.",
    ticketPrice: 0,
    status: "past",
    category: "volunteer",
    image: "/images/events/cleanup-day.jpg"
  },
  {
    id: "mental-health-workshop",
    title: "Mental Health First Aid Workshop",
    date: "2024-09-12",
    time: "10:00 AM - 4:00 PM",
    location: "Community Center",
    description: "Learn essential mental health first aid skills to support friends, family, and community members.",
    ticketPrice: 25,
    status: "upcoming",
    category: "education",
    image: "/images/events/mental-health-workshop.jpg"
  },
  {
    id: "youth-leadership-camp",
    title: "Youth Leadership Summer Camp",
    date: "2024-07-15",
    time: "9:00 AM - 3:00 PM",
    location: "Riverside Park",
    description: "Week-long leadership development camp for local youth featuring workshops, team building, and community service.",
    ticketPrice: 0,
    status: "past",
    category: "youth",
    image: "/images/events/youth-camp.jpg"
  },
  {
    id: "senior-social",
    title: "Monthly Senior Social Hour",
    date: "2024-09-28",
    time: "2:00 PM - 4:00 PM",
    location: "Community Room at Timeout Membership",
    description: "Monthly gathering for senior community members featuring refreshments, activities, and social connection.",
    ticketPrice: 0,
    status: "recurring",
    category: "social",
    image: "/images/events/senior-social.jpg"
  },
  {
    id: "fundraising-walk",
    title: "Steps for Community Walk",
    date: "2024-11-05",
    time: "8:00 AM - 11:00 AM",
    location: "Lakeside Trail",
    description: "Join our annual charity walk to raise funds for community programs while enjoying a beautiful morning outdoors.",
    ticketPrice: 20,
    status: "upcoming",
    category: "fundraiser",
    image: "/images/events/charity-walk.jpg"
  }
] as const;

export const FOUNDATION_IMPACT = {
  totalFundsRaised: 245000,
  communityMembersServed: 1250,
  volunteersEngaged: 180,
  programsActive: 12,
  partnershipsFormed: 25,
  eventsHosted: 48,
  statistics: [
    {
      label: "Community Members Served",
      value: "1,250+",
      description: "Individuals directly impacted by our programs"
    },
    {
      label: "Funds Raised",
      value: "$245k",
      description: "Total donations supporting community initiatives"
    },
    {
      label: "Active Volunteers",
      value: "180+",
      description: "Community members volunteering their time"
    },
    {
      label: "Community Programs",
      value: "12",
      description: "Active programs addressing local needs"
    },
    {
      label: "Local Partnerships",
      value: "25+",
      description: "Collaborations with local organizations"
    },
    {
      label: "Events Hosted",
      value: "48+",
      description: "Community events and workshops organized"
    }
  ]
} as const;

export const VOLUNTEER_OPPORTUNITIES = [
  {
    id: "event-coordination",
    title: "Event Coordination",
    description: "Help plan and execute foundation events and community gatherings.",
    timeCommitment: "5-10 hours/month",
    skills: ["Organization", "Communication", "Event Planning"]
  },
  {
    id: "youth-mentorship",
    title: "Youth Mentorship",
    description: "Provide guidance and support to local youth through our mentorship programs.",
    timeCommitment: "2-4 hours/week",
    skills: ["Patience", "Communication", "Leadership"]
  },
  {
    id: "senior-companionship",
    title: "Senior Companionship",
    description: "Spend time with senior community members, providing social interaction and support.",
    timeCommitment: "2-3 hours/week",
    skills: ["Empathy", "Active Listening", "Reliability"]
  },
  {
    id: "fundraising-support",
    title: "Fundraising Support",
    description: "Assist with fundraising campaigns, grant writing, and donor relations.",
    timeCommitment: "3-6 hours/month",
    skills: ["Writing", "Research", "Customer Service"]
  },
  {
    id: "community-outreach",
    title: "Community Outreach",
    description: "Help spread awareness about foundation programs and engage new community members.",
    timeCommitment: "4-8 hours/month",
    skills: ["Public Speaking", "Social Media", "Networking"]
  }
] as const;

export const DONATION_TIERS = [
  {
    id: "supporter",
    title: "Community Supporter",
    amount: 25,
    benefits: [
      "Foundation newsletter subscription",
      "Event invitations",
      "Impact reports"
    ]
  },
  {
    id: "advocate",
    title: "Community Advocate",
    amount: 50,
    benefits: [
      "All Supporter benefits",
      "Recognition on foundation website",
      "Volunteer appreciation events"
    ]
  },
  {
    id: "champion",
    title: "Community Champion",
    amount: 100,
    benefits: [
      "All Advocate benefits",
      "Quarterly foundation briefings",
      "Priority event seating",
      "Foundation branded merchandise"
    ]
  },
  {
    id: "leader",
    title: "Community Leader",
    amount: 250,
    benefits: [
      "All Leader benefits",
      "Annual foundation dinner invitation",
      "Program site visits",
      "Direct impact updates"
    ]
  },
  {
    id: "benefactor",
    title: "Community Benefactor",
    amount: 500,
    benefits: [
      "All Leader benefits",
      "Foundation board meeting invitations",
      "Program naming opportunities",
      "Personalized impact reports"
    ]
  }
] as const;
