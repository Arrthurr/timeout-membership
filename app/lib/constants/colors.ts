/**
 * Timeout At Shannon's Brand Color Constants
 * 
 * These constants provide easy access to the barber shop's brand colors
 * throughout the application. They match the CSS custom properties defined
 * in app/app.css and can be used in JavaScript/TypeScript code.
 */

// Primary Brand Colors
export const BRAND_COLORS = {
  // Core Brand Colors
  primary: '#8b4513',           // Warm saddle brown
  primaryForeground: '#ffffff', // White text on primary
  accent: '#d2691e',            // Burnt orange
  accentForeground: '#ffffff',  // White text on accent
  
  // Background & Text
  background: '#fefdfb',        // Warm off-white
  foreground: '#2d2520',        // Rich dark brown
  card: '#ffffff',              // Card background
  cardForeground: '#2d2520',    // Card text
  
  // Secondary & Muted
  secondary: '#f5f3f0',         // Warm light beige
  secondaryForeground: '#2d2520', // Text on secondary
  muted: '#f0ede8',             // Subtle warm gray
  mutedForeground: '#6b5b4f',   // Medium brown-gray
  
  // UI Elements
  border: '#e6ddd4',            // Warm border
  input: '#f5f3f0',             // Input background
  ring: '#8b4513',              // Focus ring (primary)
  destructive: '#dc2626',       // Error/delete actions
  destructiveForeground: '#ffffff',
} as const;

// Brown Color Scale (Primary Brand Color)
export const BARBER_BROWN = {
  50: '#faf8f5',   // Lightest cream
  100: '#f5f1ea',  // Light cream
  200: '#e8dcc9',  // Pale brown
  300: '#d4c0a1',  // Light brown
  400: '#b8956f',  // Medium brown
  500: '#8b4513',  // Primary brown (saddle brown)
  600: '#7a3c11',  // Dark brown
  700: '#66320e',  // Darker brown
  800: '#52280b',  // Very dark brown
  900: '#3d1e08',  // Darkest brown
} as const;

// Green Color Scale (Forest/Sage Green)
export const BARBER_GREEN = {
  50: '#f7f8f4',   // Lightest sage
  100: '#eef0e8',  // Light sage
  200: '#d6dcc6',  // Pale green
  300: '#b8c49c',  // Light green
  400: '#8fa065',  // Medium green
  500: '#556b2f',  // Primary green (forest green)
  600: '#4a5e29',  // Dark green
  700: '#3f5023',  // Darker green
  800: '#34421d',  // Very dark green
  900: '#293417',  // Darkest green
} as const;

// Steel Gray Color Scale
export const BARBER_STEEL = {
  50: '#f8f9fa',   // Lightest steel
  100: '#f1f3f4',  // Light steel
  200: '#e1e5e9',  // Pale steel
  300: '#cfd6dc',  // Light steel gray
  400: '#b4c1ca',  // Medium steel
  500: '#708090',  // Primary steel gray
  600: '#647282',  // Dark steel
  700: '#566474',  // Darker steel
  800: '#485666',  // Very dark steel
  900: '#3a4858',  // Darkest steel
} as const;

// Orange Color Scale (Burnt Orange)
export const BARBER_ORANGE = {
  50: '#fef7f0',   // Lightest orange
  100: '#fdede0',  // Light orange
  200: '#f9d4b7',  // Pale orange
  300: '#f4b584',  // Light burnt orange
  400: '#e8924f',  // Medium orange
  500: '#d2691e',  // Primary burnt orange
  600: '#be5d1a',  // Dark orange
  700: '#a15016',  // Darker orange
  800: '#844312',  // Very dark orange
  900: '#67360e',  // Darkest orange
} as const;

// Chart Colors for Data Visualization
export const CHART_COLORS = {
  1: BARBER_BROWN[500],  // Saddle Brown
  2: BARBER_GREEN[500],  // Forest Green
  3: BARBER_ORANGE[500], // Burnt Orange
  4: BARBER_STEEL[500],  // Steel Gray
  5: '#a0522d',          // Sienna (additional chart color)
} as const;

// Sidebar Colors (for dashboard/admin areas)
export const SIDEBAR_COLORS = {
  background: BRAND_COLORS.secondary,
  foreground: BRAND_COLORS.foreground,
  primary: BRAND_COLORS.primary,
  primaryForeground: BRAND_COLORS.primaryForeground,
  accent: '#ede7df',     // Slightly darker than secondary
  accentForeground: BRAND_COLORS.foreground,
  border: BRAND_COLORS.border,
  ring: BRAND_COLORS.ring,
} as const;

// Utility function to get CSS variable reference
export const getCSSVariable = (colorPath: string): string => {
  const colorMap: Record<string, string> = {
    'primary': 'var(--primary)',
    'accent': 'var(--accent)',
    'background': 'var(--background)',
    'foreground': 'var(--foreground)',
    'barber-brown-500': 'var(--barber-brown-500)',
    'barber-green-500': 'var(--barber-green-500)',
    'barber-steel-500': 'var(--barber-steel-500)',
    'barber-orange-500': 'var(--barber-orange-500)',
  };
  
  return colorMap[colorPath] || colorPath;
};

// Color palette for easy access
export const COLOR_PALETTE = {
  brown: BARBER_BROWN,
  green: BARBER_GREEN,
  steel: BARBER_STEEL,
  orange: BARBER_ORANGE,
  brand: BRAND_COLORS,
  chart: CHART_COLORS,
  sidebar: SIDEBAR_COLORS,
} as const;

// Export commonly used colors
export const {
  primary,
  accent,
  background,
  foreground,
  secondary,
  muted,
} = BRAND_COLORS;

// Type definitions for TypeScript
export type BrandColor = keyof typeof BRAND_COLORS;
export type ColorShade = keyof typeof BARBER_BROWN;
export type ChartColor = keyof typeof CHART_COLORS;
