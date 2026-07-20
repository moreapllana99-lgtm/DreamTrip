import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";

export async function POST(req: NextRequest) {
  if (!OPENROUTER_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { action, messages, tripData } = body;

    if (action === "chat") {
      return handleChat(messages);
    }
    if (action === "plan") {
      return handlePlan(tripData);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AI request failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

async function callOpenRouter(messages: unknown[], jsonMode = false) {
  const fetchBody: Record<string, unknown> = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: jsonMode ? 4096 : 1024,
  };
  if (jsonMode) {
    fetchBody.response_format = { type: "json_object" };
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": "https://dreamtrip.app",
      "X-Title": "DreamTrip AI",
    },
    body: JSON.stringify(fetchBody),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Chat ───
async function handleChat(messages: unknown[]) {
  const systemMsg = {
    role: "system",
    content:
      "You are DreamTrip AI, a friendly travel assistant. You help users plan trips, find destinations, pack, budget, and stay safe. Keep replies concise (2-5 sentences), casual, and use 1-2 emojis. When asked about specific destinations, mention real attractions and tips.",
  };

  const reply = await callOpenRouter([systemMsg, ...(messages as [])]);
  return NextResponse.json({ reply });
}

// ─── Trip Planning ───
async function handlePlan(tripData: unknown) {
  const td = tripData as Record<string, unknown>;
  const days = calculateDays(String(td.startDate || ""), String(td.endDate || "")) || 3;

  const prompt = {
    role: "user",
    content: `Generate a detailed ${days}-day travel itinerary in JSON for a trip with these details:
- Destination: ${td.destination || "unknown"}
- Budget: ${td.budget || 2000} ${td.currency || "USD"}
- Travel style: ${td.travelStyle || "adventure"}
- Interests: ${td.interests || "general"}
- Travelers: ${JSON.stringify(td.travelers || { adults: 1, kids: 0, pets: 0 })}
- Notes: ${td.customNotes || "none"}

Return ONLY valid JSON (no markdown) with this EXACT structure:
{
  "summary": "1-sentence trip summary",
  "dailyPlan": [{ "day": 1, "date": "Day 1", "activities": [{ "time": "09:00", "title": "...", "description": "...", "location": "...", "lat": 0, "lng": 0, "duration": "2h", "cost": 0, "category": "sightseeing" }], "meals": [{ "type": "breakfast", "restaurant": "...", "cuisine": "...", "estimatedCost": 15, "address": "..." }], "notes": "" }],
  "flights": [{ "airline": "...", "flightNumber": "XX123", "departure": "Origin", "arrival": "Destination", "departureTime": "08:00", "arrivalTime": "12:00", "price": 500, "bookingUrl": "" }],
  "hotels": [{ "name": "...", "rating": 4.5, "pricePerNight": 150, "address": "...", "lat": 0, "lng": 0, "amenities": ["WiFi", "Pool"], "bookingUrl": "", "imageUrl": "" }],
  "restaurants": [{ "name": "...", "cuisine": "...", "priceRange": "$$", "rating": 4.5, "address": "...", "lat": 0, "lng": 0, "imageUrl": "" }],
  "attractions": [{ "name": "...", "description": "...", "category": "...", "price": 20, "duration": "2h", "bestTimeToVisit": "Morning", "lat": 0, "lng": 0, "imageUrl": "", "rating": 4.5 }],
  "hiddenGems": [{ "name": "...", "description": "...", "type": "...", "lat": 0, "lng": 0 }],
  "budget": { "flights": 500, "hotels": 450, "food": 300, "activities": 200, "transportation": 100, "shopping": 150, "misc": 100, "total": 1800, "currency": "${td.currency || "USD"}" },
  "packingChecklist": ["item1", "item2"],
  "safetyTips": ["tip1", "tip2"],
  "weatherForecast": [{ "date": "...", "condition": "Sunny", "highTemp": 25, "lowTemp": 15, "humidity": 60, "precipitation": 10, "icon": "sun" }],
  "localTransportation": [{ "type": "Metro", "description": "...", "cost": "$2/ride", "tips": "..." }],
  "emergencyContacts": [{ "service": "Police", "number": "911", "description": "Emergency" }],
  "travelAdvice": ["advice1", "advice2"],
  "photoSpots": ["spot1", "spot2"],
  "localFoods": ["food1", "food2"],
  "shoppingRecommendations": ["rec1", "rec2"],
  "alternativePlans": ["plan B suggestion"],
  "timeline": [{ "time": "08:00", "title": "Departure", "description": "...", "icon": "✈️" }]
}

Make the itinerary realistic for ${td.destination}. Use real restaurant names, attractions, and hotels where possible. Keep all numbers reasonable for the budget. Return exactly ${days} days.`,
  };

  const raw = await callOpenRouter([prompt], true);
  // Strip markdown code fences if present
  const json = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const itinerary = JSON.parse(json);
  return NextResponse.json({ itinerary });
}

function calculateDays(start: string, end: string): number {
  if (!start || !end) return 3;
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diff || 3, 14));
}
