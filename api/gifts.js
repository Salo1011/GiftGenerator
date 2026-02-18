export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  const { age, gender, traits, hobbies, budget, extraContext } = req.body;

  const prompt = `You are a thoughtful gift advisor. Generate exactly 6 personalized gift ideas based on this person's profile:
- Age group: ${age || "not specified"}
- Gender: ${gender || "not specified"}
- Personality traits: ${(traits || []).join(", ") || "not specified"}
- Hobbies & interests: ${(hobbies || []).join(", ") || "not specified"}
- Budget: ${budget || "flexible"}
- Extra context: ${extraContext || "none"}

Return ONLY a valid JSON array with exactly 6 objects. Each object must have:
- "name": short, specific gift name (not generic)
- "category": one word category (e.g. Experience, Gadget, Book, Fashion, etc.)
- "priceRange": estimated price in Indian Rupees like "₹800–₹1,200"
- "reason": 2-3 sentences explaining why this gift is perfect for this specific person
- "imageQuery": a 2-4 word Unsplash image search query for a beautiful product photo of this gift
- "where": array of 1-2 objects each with "name" and "url" as direct search URLs. Formats: Amazon.in: "https://www.amazon.in/s?k=GIFT+NAME", Flipkart: "https://www.flipkart.com/search?q=GIFT+NAME", Myntra: "https://www.myntra.com/GIFT-NAME", Nykaa: "https://www.nykaa.com/search/result/?q=GIFT+NAME". URL-encode gift names. Prefer Indian retailers.

Make gifts diverse, creative, and genuinely tailored. No gift cards.
Respond with only the JSON array, no other text.`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await anthropicRes.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "Anthropic API error" });
    }

    if (!data.content?.length) {
      return res.status(500).json({ error: "Empty response from Anthropic" });
    }

    const text = data.content.map((b) => b.text || "").join("");
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

    if (!Array.isArray(parsed)) {
      return res.status(500).json({ error: "Invalid response format" });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unexpected error" });
  }
}
