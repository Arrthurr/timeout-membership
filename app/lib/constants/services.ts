import { zenotiServiceId, type ZenotiServiceId } from './zenoti';

export interface BarberService {
  id: string;
  zenotiServiceId: ZenotiServiceId;
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

export const BARBER_SERVICES: BarberService[] = [
  {
    id: 'draft-picks',
    zenotiServiceId: zenotiServiceId('ef1a4a01-f6ba-44e2-8af6-5c02ab6a4e07'),
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
    zenotiServiceId: zenotiServiceId('9d336934-a810-4e6f-8054-c64269e3294c'),
    name: 'Rookies',
    sportsTheme: 'High School',
    price: 45,
    duration: '45 minutes',
    description: 'College students with valid ID get the rookie rate on quality cuts.',
    includes: ['Haircut', 'Basic styling', 'Student ID required'],
    category: 'standard',
    memberDiscount: 5,
    icon: '🎓'
  },
  {
    id: 'she-got-game',
    zenotiServiceId: zenotiServiceId('4464e90f-651b-4821-801f-acd9b9d3c545'),
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
    zenotiServiceId: zenotiServiceId('145608eb-fc0a-4384-97cd-0e474ca809e8'),
    name: 'Timeout Called',
    sportsTheme: 'The Classic Play',
    price: 95,
    duration: '60 minutes',
    description: 'Take a timeout for the perfect haircut and beard refresh.',
    includes: ['Precision haircut', 'Beard trim', 'Shampoo', 'Styling'],
    category: 'standard',
    memberDiscount: 10,
    icon: '⏱️'
  },
  {
    id: 'official-review',
    zenotiServiceId: zenotiServiceId('84245caa-5a79-4164-b6e3-baad9532a76c'),
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
    zenotiServiceId: zenotiServiceId('a1652794-436a-45e1-91b2-e524e29f62d1'),
    name: 'That\'s a Close Call',
    sportsTheme: 'Complete Razor Shave',
    price: 100,
    duration: '60 minutes',
    description: 'Precision straight razor shave that\'s smoother than a perfect call.',
    includes: ['Hot towel preparation', 'Straight razor shave', 'Cool towel finish', 'Aftershave treatment'],
    category: 'specialty',
    memberDiscount: 10,
    icon: '🪒'
  },
  {
    id: 'overtime',
    zenotiServiceId: zenotiServiceId('abc1388e-e043-469c-86d8-9a2c36aed063'),
    name: 'Full Timeout',
    sportsTheme: 'Complete Service',
    price: 120,
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

export const getMemberPrice = (service: BarberService): number => {
  if (!service.memberDiscount) return service.price;
  return service.price - service.memberDiscount;
};

export const formatPrice = (price: number): string => {
  return `$${price}`;
};
