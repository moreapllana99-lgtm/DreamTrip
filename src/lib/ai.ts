import { Trip, Itinerary } from './types';
import { generateItinerary } from './mock-data';

// Simulate AI trip planning with mock responses
export async function planTrip(tripData: Partial<Trip>): Promise<Itinerary> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Generate itinerary based on trip data
  const itinerary = generateItinerary(tripData);

  // Add some randomness to make it feel like AI
  itinerary.summary = `After analyzing millions of data points, here's your personalized ${itinerary.dailyPlan.length}-day journey through ${tripData.destination}. We've curated the perfect blend of ${tripData.interests?.join(', ') || 'activities'} tailored to your ${tripData.travelStyle || 'preferred'} travel style.`;

  return itinerary;
}

// AI Chat responses
const chatResponses: Record<string, string[]> = {
  pack: [
    "Here's what you should pack: 1) Comfortable walking shoes 👟 2) Weather-appropriate layers 🧥 3) Universal power adapter 🔌 4) Portable charger 🔋 5) Sunscreen 🧴 6) First aid kit 💊 7) Copies of important documents 📄 8) Reusable water bottle 💧",
  ],
  cheap: [
    'To find cheap restaurants: 1) Use local food apps like Yelp or Google Maps 🗺️ 2) Eat where locals eat — avoid tourist zones 🍜 3) Try street food markets 🏪 4) Look for lunch specials (often cheaper than dinner) 💰 5) Check university areas for budget eats 🎓',
  ],
  money: [
    "For a typical trip, budget $50-100/day for budget travel, $100-200/day for mid-range, and $200-400+/day for luxury. Always bring 20% extra for unexpected expenses! 💳 Don't forget to notify your bank about travel plans.",
  ],
  scams: [
    'Watch out for these common scams: 1) "Free" bracelets or flowers that suddenly cost money 🌹 2) Unofficial taxis with rigged meters 🚕 3) "Closed hotel" redirects 🏨 4) Overpriced currency exchange 💱 5) Pickpockets in crowded areas 🎒 Always research common scams for your specific destination!',
  ],
  language: [
    'Most major tourist destinations have English speakers. However, learning a few phrases goes a long way: "Hello", "Thank you", "Please", "How much?", and "Where is...?" 🌍 I recommend downloading Google Translate offline for emergencies! 📱',
  ],
  weather: [
    "Check the weather forecast before you go! Pack layers for variable conditions. May-September is generally great for Europe, November-March for Southeast Asia, December-April for the Caribbean. Always bring a light rain jacket just in case! 🌦️",
  ],
  visa: [
    'Visa requirements vary by passport. Check your destination\'s official embassy website. Many countries offer visa-free travel for 30-90 days. For longer stays, you may need to apply in advance. Consider visa processing times (can take 2-8 weeks)! 🛂',
  ],
  safety: [
    'Stay safe by: 1) Sharing your itinerary with family 📋 2) Saving emergency numbers 📞 3) Using official transportation 🚕 4) Keeping valuables in hotel safe 🔒 5) Being aware of your surroundings 👀 6) Having travel insurance 🏥 7) Making digital copies of documents 💾',
  ],
};

export async function getChatResponse(message: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

  const msg = message.toLowerCase();

  if (msg.includes('pack')) return chatResponses.pack[0];
  if (msg.includes('cheap') || msg.includes('restaurant')) return chatResponses.cheap[0];
  if (msg.includes('money') || msg.includes('budget') || msg.includes('cost')) return chatResponses.money[0];
  if (msg.includes('scam') || msg.includes('avoid')) return chatResponses.scams[0];
  if (msg.includes('language') || msg.includes('speak')) return chatResponses.language[0];
  if (msg.includes('weather')) return chatResponses.weather[0];
  if (msg.includes('visa') || msg.includes('passport')) return chatResponses.visa[0];
  if (msg.includes('safe') || msg.includes('danger')) return chatResponses.safety[0];

  return "Great question! I'm here to help with all your travel needs. You can ask me about packing tips, budgeting, local cuisine, safety advice, or anything travel-related! ✈️🌍";
}
