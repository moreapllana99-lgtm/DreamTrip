// ─── DreamTrip Type Definitions ───

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  settings?: UserSettings;
  subscription?: SubscriptionTier;
}

export interface UserSettings {
  darkMode: boolean;
  emailNotifications: boolean;
  currency: string;
  language: string;
  measurementSystem: 'metric' | 'imperial';
}

export type SubscriptionTier = 'free' | 'premium' | 'pro';

export interface Trip {
  id: string;
  userId: string;
  title: string;
  destination: string;
  destinationId?: string;
  departureCity: string;
  startDate: string;
  endDate: string;
  travelers: Travelers;
  budget: number;
  currency: string;
  travelStyle: TravelStyle;
  interests: Interest[];
  weatherPreference?: string;
  transportationPreference?: string;
  hotelRating?: number;
  accessibility?: string[];
  dietaryRestrictions?: string[];
  customNotes?: string;
  status: 'draft' | 'planned' | 'active' | 'completed';
  itinerary?: Itinerary;
  isPublic: boolean;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface Travelers {
  adults: number;
  kids: number;
  pets: number;
}

export type TravelStyle =
  | 'luxury'
  | 'budget'
  | 'backpacking'
  | 'adventure'
  | 'family'
  | 'business'
  | 'romantic'
  | 'solo';

export type Interest =
  | 'beach'
  | 'food'
  | 'museums'
  | 'shopping'
  | 'nature'
  | 'hiking'
  | 'nightlife'
  | 'photography'
  | 'culture'
  | 'sports';

export interface Itinerary {
  summary: string;
  dailyPlan: DayPlan[];
  flights: Flight[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  attractions: Attraction[];
  hiddenGems: HiddenGem[];
  budget: BudgetBreakdown;
  packingChecklist: string[];
  safetyTips: string[];
  weatherForecast: WeatherForecast[];
  localTransportation: TransportationInfo[];
  emergencyContacts: EmergencyContact[];
  travelAdvice: string[];
  photoSpots: string[];
  localFoods: string[];
  shoppingRecommendations: string[];
  alternativePlans: string[];
  timeline: TimelineEvent[];
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  meals: Meal[];
  notes: string;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  duration: string;
  cost: number;
  category: string;
  bookingUrl?: string;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  restaurant: string;
  cuisine: string;
  estimatedCost: number;
  address: string;
}

export interface Flight {
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  bookingUrl: string;
}

export interface Hotel {
  name: string;
  rating: number;
  pricePerNight: number;
  address: string;
  lat: number;
  lng: number;
  amenities: string[];
  bookingUrl: string;
  imageUrl: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  address: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

export interface Attraction {
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  bestTimeToVisit: string;
  lat: number;
  lng: number;
  imageUrl: string;
  rating: number;
}

export interface HiddenGem {
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
}

export interface BudgetBreakdown {
  flights: number;
  hotels: number;
  food: number;
  activities: number;
  transportation: number;
  shopping: number;
  misc: number;
  total: number;
  currency: string;
}

export interface WeatherForecast {
  date: string;
  condition: string;
  highTemp: number;
  lowTemp: number;
  humidity: number;
  precipitation: number;
  icon: string;
}

export interface TransportationInfo {
  type: string;
  description: string;
  cost: string;
  tips: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
  description: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  bannerImage: string;
  gallery: string[];
  currency: string;
  language: string;
  timezone: string;
  visaRequirements: string;
  safetyScore: number;
  costOfLiving: string;
  popularAttractions: string[];
  bestRestaurants: string[];
  bestHotels: string[];
  transportation: string;
  nightlife: string;
  foodGuide: string;
  emergencyNumbers: EmergencyContact[];
  weather: string;
  reviews: Review[];
  rating: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  bookmarks: number;
  readTime: number;
  publishedAt: string;
}

export interface Comment {
  id: string;
  postId?: string;
  tripId?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'trip_reminder' | 'weather_alert' | 'price_change' | 'new_comment' | 'community_like';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface SearchResult {
  type: 'destination' | 'hotel' | 'restaurant' | 'activity' | 'blog' | 'user' | 'trip';
  title: string;
  subtitle: string;
  image: string;
  url: string;
  rating?: number;
}
