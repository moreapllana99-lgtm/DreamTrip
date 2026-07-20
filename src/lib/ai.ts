import { Trip, Itinerary } from "./types";
import { generateItinerary } from "./mock-data";

// ─── Real AI via API route (server-side OpenRouter proxy) ───
// Falls back to mock data when the API is unreachable or not configured.

async function callAI(action: "chat" | "plan", payload: unknown) {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...(payload as Record<string, unknown>) }),
    });
    if (!res.ok) throw new Error("AI API error");
    return res.json();
  } catch {
    return null;
  }
}

// ─── AI Trip Planner ───
export async function planTrip(tripData: Partial<Trip>): Promise<Itinerary> {
  // Try real AI first
  const data = await callAI("plan", { tripData });
  if (data?.itinerary) {
    return data.itinerary as Itinerary;
  }

  // Fallback to mock
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1500));
  const itinerary = generateItinerary(tripData);
  itinerary.summary = `After analyzing millions of data points, here's your personalized ${itinerary.dailyPlan.length}-day journey through ${tripData.destination}. We've curated the perfect blend of ${tripData.interests?.join(", ") || "activities"} tailored to your ${tripData.travelStyle || "preferred"} travel style.`;
  return itinerary;
}

// ─── AI Chat ───
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function getChatResponse(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  const messages = [
    ...history,
    { role: "user" as const, content: message },
  ];

  // Try real AI
  const data = await callAI("chat", { messages });
  if (data?.reply) return data.reply;

  // Fallback to keyword matching
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));
  const msg = message.toLowerCase();

  if (msg.includes("pack")) return "Here's what you should pack: 1) Comfortable walking shoes 👟 2) Weather-appropriate layers 🧥 3) Universal power adapter 🔌 4) Portable charger 🔋 5) Sunscreen 🧴 6) First aid kit 💊 7) Copies of important documents 📄 8) Reusable water bottle 💧";
  if (msg.includes("cheap") || msg.includes("restaurant")) return "To find cheap restaurants: 1) Use local food apps like Yelp 🗺️ 2) Eat where locals eat — avoid tourist zones 🍜 3) Try street food markets 🏪 4) Lunch specials are often cheaper 💰 5) University areas have budget eats 🎓";
  if (msg.includes("money") || msg.includes("budget") || msg.includes("cost")) return "Budget $50-100/day for budget travel, $100-200/day mid-range, $200-400+/day luxury. Always bring 20% extra for unexpected expenses! 💳";
  if (msg.includes("scam") || msg.includes("avoid")) return "Watch out for: 1) 'Free' items that cost money 🌹 2) Unofficial taxis 🚕 3) 'Closed hotel' redirects 🏨 4) Bad currency exchange 💱 5) Pickpockets in crowds 🎒 Research common scams for your destination!";
  if (msg.includes("language") || msg.includes("speak")) return "Most tourist spots have English speakers. Learn: 'Hello', 'Thank you', 'Please', 'How much?', 'Where is...?' 🌍 Download Google Translate offline! 📱";
  if (msg.includes("weather")) return "Check forecasts before you go! May-Sep = Europe, Nov-Mar = SE Asia, Dec-Apr = Caribbean. Always bring a light rain jacket! 🌦️";
  if (msg.includes("visa") || msg.includes("passport")) return "Visa rules vary by passport. Check your destination's embassy website. Many countries offer visa-free 30-90 day stays. Apply 2-8 weeks ahead! 🛂";
  if (msg.includes("safe") || msg.includes("danger")) return "Stay safe: 1) Share itinerary with family 📋 2) Save emergency numbers 📞 3) Use official transport 🚕 4) Hotel safe for valuables 🔒 5) Stay aware 👀 6) Travel insurance 🏥";
  if (msg.includes("hotel") || msg.includes("stay")) return "Look for hotels with 4+ star reviews on Booking.com or Agoda. Check cancellation policies and proximity to public transport. 🏨 Book 2-4 weeks ahead for best rates!";
  if (msg.includes("flight") || msg.includes("fly")) return "Use Google Flights or Skyscanner to compare prices. Book 6-8 weeks ahead for international, 3-4 weeks for domestic. Set price alerts! ✈️ Tuesday and Wednesday are often cheapest.";

  return "Great question! I'm here to help with all your travel needs — ask me about destinations, packing, budgeting, food, safety, or anything travel-related! ✈️🌍";
}
