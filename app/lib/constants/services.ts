export interface BarberService {
  id: string;
  name: string;
  sportsTheme: string;
  price: number;
  duration: string;
  description: string;
  includes: string[];
  category: 'premium' | 'standard' | 'specialty';
  memberDiscount?: number;
  icon?: string;
}

export const ZENOTI_WEBSTORE_URL =
  'https://timeoutlounge.zenoti.com/webstoreNew' as const;

export const BARBER_SERVICES: BarberService[] = [
  {
    id: 'draft-picks',
    name: 'Draft Picks',
    sportsTheme: 'Youth League',
    price: 40,
    duration: '45 minutes',
    description: 'Future all-stars get the VIP treatment - kids through high school.',
    includes: ['Age-appropriate haircut', 'Gentle approach', 'Parent consultation welcome'],
    category: 'standard',
    memberDiscount: 5,
    icon: '⭐'
  },
  {
    id: 'rookies',
    name: 'Rookies',
    sportsTheme: 'High School & Undergrads',
    price: 50,
    duration: '25 minutes',
    description: 'College students with valid ID get the rookie rate on quality cuts.',
    includes: ['Haircut', 'Basic styling', 'Student ID required'],
    category: 'standard',
    memberDiscount: 5,
    icon: '🎓'
  },
  {
    id: 'she-got-game',
    name: 'She Got Game',
    sportsTheme: 'Women\'s Championship Cut',
    price: 50,
    duration: '45 minutes',
    description: 'Precision shear cut and shampoo designed specifically for women.',
    includes: ['Shear cut', 'Shampoo', 'Styling consultation'],
    category: 'specialty',
    memberDiscount: 8,
    icon: '👩🏾‍🦱'
  },
  {
    id: 'timeout-called',
    name: 'Timeout Called',
    sportsTheme: 'The Classic Play',
    price: 50,
    duration: '60 minutes',
    description: 'Take a timeout for the perfect haircut and beard refresh.',
    includes: ['Precision haircut', 'Beard trim', 'Shampoo', 'Styling'],
    category: 'standard',
    memberDiscount: 10,
    icon: '⏱️'
  },
  {
    id: 'official-review',
    name: 'An Official Review',
    sportsTheme: 'Beard & Shave Specialist',
    price: 60,
    duration: '60 minutes',
    description: 'Professional beard maintenance with precision razor work.',
    includes: ['Razor shave', 'Beard trim & shaping', 'Hot towel treatment'],
    category: 'specialty',
    memberDiscount: 8,
    icon: '🧔🏾‍♂️'
  },
  {
    id: 'close-call',
    name: 'That\'s a Close Call',
    sportsTheme: 'Complete Razor Shave',
    price: 80,
    duration: '60 minutes',
    description: 'Precision straight razor shave that\'s smoother than a perfect call.',
    includes: ['Hot towel preparation', 'Straight razor shave', 'Cool towel finish', 'Aftershave treatment'],
    category: 'specialty',
    memberDiscount: 10,
    icon: '🪒'
  },
  {
    id: 'overtime',
    name: 'Full Timeout',
    sportsTheme: 'Complete Service',
    price: 100,
    duration: '90 minutes',
    description: 'Our signature complete service experience - the ultimate timeout treatment.',
    includes: ['Precision haircut', 'Hot towel straight razor shave', 'Shampoo & scalp treatment', 'Styling & aftercare'],
    category: 'premium',
    memberDiscount: 15,
    icon: '👑'
  }
];

export const SERVICE_CATEGORIES = {
  premium: {
    name: 'Premium Experience',
    description: 'Our signature services for the ultimate grooming experience',
    color: 'barber-brown'
  },
  standard: {
    name: 'Essential Services',
    description: 'Quality cuts and grooming for everyday excellence',
    color: 'barber-green'
  },
  specialty: {
    name: 'Specialty Services',
    description: 'Specialized services for unique needs and preferences',
    color: 'orange'
  }
} as const;

// Helper functions
export const getServiceById = (id: string): BarberService | undefined => {
  return BARBER_SERVICES.find(service => service.id === id);
};

export const getServicesByCategory = (category: BarberService['category']): BarberService[] => {
  return BARBER_SERVICES.filter(service => service.category === category);
};

export const getMemberPrice = (service: BarberService): number => {
  if (!service.memberDiscount) return service.price;
  return service.price - service.memberDiscount;
};

export const formatPrice = (price: number): string => {
  return `$${price}`;
};

export const formatDuration = (duration: string): string => {
  return duration;
};
