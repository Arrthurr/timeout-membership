export interface CafeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'spirits';
  type?: 'hot' | 'cold' | 'specialty';
  memberDiscount?: number;
  icon?: string;
  alcoholContent?: string;
  availability?: 'all-day' | 'evening' | 'limited';
}

export const CAFE_MENU: CafeItem[] = [
  // Coffee Menu
  {
    id: 'timeout-espresso',
    name: 'Timeout Espresso',
    description: 'Rich, bold espresso shot - the perfect 20-second pick-me-up',
    price: 3,
    category: 'coffee',
    type: 'hot',
    memberDiscount: 0.50,
    icon: '☕',
    availability: 'all-day'
  },
  {
    id: 'championship-americano',
    name: 'Championship Americano',
    description: 'Double shot espresso with hot water - a winning combination',
    price: 4,
    category: 'coffee',
    type: 'hot',
    memberDiscount: 0.50,
    icon: '☕',
    availability: 'all-day'
  },
  {
    id: 'mvp-latte',
    name: 'MVP Latte',
    description: 'Smooth espresso with steamed milk and microfoam artistry',
    price: 5,
    category: 'coffee',
    type: 'hot',
    memberDiscount: 0.75,
    icon: '☕',
    availability: 'all-day'
  },
  {
    id: 'slam-dunk-cappuccino',
    name: 'Slam Dunk Cappuccino',
    description: 'Perfect balance of espresso, steamed milk, and foam',
    price: 5,
    category: 'coffee',
    type: 'hot',
    memberDiscount: 0.75,
    icon: '☕',
    availability: 'all-day'
  },
  {
    id: 'buzzer-beater-macchiato',
    name: 'Buzzer Beater Macchiato',
    description: 'Espresso "marked" with a dollop of steamed milk foam',
    price: 5,
    category: 'coffee',
    type: 'hot',
    memberDiscount: 0.75,
    icon: '☕',
    availability: 'all-day'
  },
  {
    id: 'cold-brew-clutch',
    name: 'Cold Brew Clutch',
    description: 'Smooth, cold-brewed coffee served over ice - clutch performance',
    price: 4,
    category: 'coffee',
    type: 'cold',
    memberDiscount: 0.50,
    icon: '🧊',
    availability: 'all-day'
  },
  {
    id: 'iced-timeout-latte',
    name: 'Iced Timeout Latte',
    description: 'Chilled espresso with cold milk over ice - refreshing break',
    price: 5,
    category: 'coffee',
    type: 'cold',
    memberDiscount: 0.75,
    icon: '🧊',
    availability: 'all-day'
  },
  {
    id: 'french-press-fundamentals',
    name: 'French Press Fundamentals',
    description: 'Classic full-bodied coffee brewing - back to basics excellence',
    price: 6,
    category: 'coffee',
    type: 'specialty',
    memberDiscount: 1.00,
    icon: '☕',
    availability: 'limited'
  },

  // Spirits Menu (Evening)
  {
    id: 'whiskey-timeout',
    name: 'Timeout Whiskey',
    description: 'Premium bourbon - smooth finish for the end of a long day',
    price: 12,
    category: 'spirits',
    memberDiscount: 2.00,
    icon: '🥃',
    alcoholContent: '40% ABV',
    availability: 'evening'
  },
  {
    id: 'scotch-championship',
    name: 'Championship Scotch',
    description: 'Single malt Scotch whisky - a champion\'s choice',
    price: 15,
    category: 'spirits',
    memberDiscount: 3.00,
    icon: '🥃',
    alcoholContent: '43% ABV',
    availability: 'evening'
  },
  {
    id: 'rye-rookie',
    name: 'Rookie Rye',
    description: 'Smooth rye whiskey - perfect for newcomers to premium spirits',
    price: 10,
    category: 'spirits',
    memberDiscount: 2.00,
    icon: '🥃',
    alcoholContent: '45% ABV',
    availability: 'evening'
  },
  {
    id: 'cognac-clutch',
    name: 'Clutch Cognac',
    description: 'Fine French cognac - smooth performance when it matters most',
    price: 18,
    category: 'spirits',
    memberDiscount: 3.00,
    icon: '🥃',
    alcoholContent: '40% ABV',
    availability: 'evening'
  },
  {
    id: 'rum-full-court',
    name: 'Full Court Rum',
    description: 'Premium aged rum - complex flavors that go the distance',
    price: 14,
    category: 'spirits',
    memberDiscount: 2.50,
    icon: '🥃',
    alcoholContent: '42% ABV',
    availability: 'evening'
  },
  {
    id: 'tequila-game-winner',
    name: 'Game Winner Tequila',
    description: '100% agave tequila - clean finish for victory celebrations',
    price: 13,
    category: 'spirits',
    memberDiscount: 2.50,
    icon: '🥃',
    alcoholContent: '40% ABV',
    availability: 'evening'
  }
];

export const CAFE_CATEGORIES = {
  coffee: {
    name: 'Out of Bounds Café',
    description: 'Premium coffee drinks to fuel your day',
    color: 'barber-brown',
    icon: '☕',
    availability: 'COMING SOON'
  },
  spirits: {
    name: 'Select Spirits',
    description: 'Premium spirits for evening relaxation',
    color: 'orange',
    icon: '🥃',
    availability: 'Available evenings only'
  }
} as const;

export const CAFE_HOURS = {
  coffee: {
    weekdays: '7:00 AM - 7:00 PM',
    saturday: '7:00 AM - 6:00 PM',
    sunday: '8:00 AM - 4:00 PM'
  },
  spirits: {
    weekdays: '5:00 PM - 7:00 PM',
    saturday: '4:00 PM - 6:00 PM',
    sunday: 'Not available'
  }
};

// Helper functions
export const getCafeItemById = (id: string): CafeItem | undefined => {
  return CAFE_MENU.find(item => item.id === id);
};

export const getItemsByCategory = (category: CafeItem['category']): CafeItem[] => {
  return CAFE_MENU.filter(item => item.category === category);
};

export const getCoffeeItems = (): CafeItem[] => {
  return getItemsByCategory('coffee');
};

export const getSpiritsItems = (): CafeItem[] => {
  return getItemsByCategory('spirits');
};

export const getMemberPrice = (item: CafeItem): number => {
  if (!item.memberDiscount) return item.price;
  return Math.max(0, item.price - item.memberDiscount);
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const getMemberSavings = (item: CafeItem): string => {
  if (!item.memberDiscount) return '';
  return `Save $${item.memberDiscount.toFixed(2)}`;
};

