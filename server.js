import "dotenv/config";
import http from "http";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/api/gifts") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { age, gender, traits, hobbies, budget, extraContext } = JSON.parse(body);
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "ANTHROPIC_API_KEY not set in .env" }));
        }

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
        if (data.error) throw new Error(data.error.message);
        const text = data.content.map((b) => b.text || "").join("");
        const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(parsed));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
