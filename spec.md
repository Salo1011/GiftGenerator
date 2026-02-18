Here's the full PRD as copyable text:

---

# The Gift Finder — Product Requirements Document
**Version 1.0 · February 2026 · Confidential**

Status: Draft | Platform: Web | Powered by Claude AI | Market: India 🇮🇳

---

## 1. Executive Summary

The Gift Finder is an AI-powered web application that eliminates the frustration of finding the right gift for someone. Users describe a recipient's personality, hobbies, age, gender, and budget — and the app generates six highly personalised gift recommendations, complete with reasoning and direct buy links to Indian e-commerce platforms.

**Core Value Proposition:** In under two minutes, any user can go from "I have no idea what to get them" to six thoughtful, purchasable gift ideas — tailored to a real person, not a demographic.

The product is built as a single-page React application, powered by the Claude claude-sonnet-4-20250514 model via Anthropic's API. It requires no account creation, no data storage, and no payment — making it frictionless for first-time and repeat users alike.

---

## 2. Problem Statement

### The Challenge

Gift-giving is one of the most universally stressful consumer experiences. People consistently report anxiety about choosing the right gift, wasting money on unwanted presents, and spending hours browsing without direction.

| Pain Point | Impact |
|---|---|
| No idea where to start | Leads to generic, impersonal gifts (gift cards, cash) |
| Too many choices online | Decision fatigue; users abandon the shopping journey |
| Generic gift guides | Not tailored to the individual recipient's personality |
| Budget mismatch | Over- or under-spending relative to the relationship |
| India-specific shopping | Most gift tools surface Western retailers unavailable in India |

### Why Existing Solutions Fall Short

- Search engines return generic listicles with no personalisation
- Pinterest boards require curation effort from the user
- Amazon wishlists require the recipient to pre-populate them
- AI chatbots (e.g. ChatGPT) require users to craft their own prompts
- Existing gift tools are Western-market focused with no Indian retailer support

---

## 3. Goals & Success Metrics

### Product Goals

- Deliver a gift recommendation experience that feels personal, not algorithmic
- Achieve < 30-second time-to-first-recommendation from page load
- Support the full Indian gifting market with ₹-denominated budgets and local retailers
- Maintain zero friction — no sign-up, no account, no paywall

### Key Success Metrics

| Metric | Description | Target |
|---|---|---|
| Time to Results | From clicking 'Find Perfect Gifts' to seeing all 6 cards | < 12 seconds |
| Relevance Score | User-rated relevance of top suggestion (1–5) | ≥ 4.0 |
| Click-through Rate | % of sessions with at least one shop link clicked | ≥ 35% |
| Regeneration Rate | % of sessions where user generates a second set | ≥ 20% |
| Session Completion | % of users who reach Step 3 from Step 1 | ≥ 70% |
| Step 2 Drop-off | % abandoning on personality / hobbies step | < 20% |

---

## 4. Target Users

### Persona 1 — The Thoughtful Giver

| | |
|---|---|
| Age | 22–40 |
| Occasion | Birthday, anniversary, housewarming, festival |
| Behaviour | Starts browsing 2–3 days before the occasion; wants something meaningful |
| Frustration | Spends hours on Amazon/Flipkart without a clear direction |
| Motivation | Wants the recipient to feel genuinely known and appreciated |

### Persona 2 — The Last-Minute Shopper

| | |
|---|---|
| Age | 18–35 |
| Occasion | Realised the day before; panic mode |
| Behaviour | Needs a fast, confident answer with a direct buy link |
| Frustration | Generic options like Amazon gift cards feel impersonal |
| Motivation | Avoid embarrassment; look thoughtful despite time pressure |

### Persona 3 — The Corporate/Group Gifter

| | |
|---|---|
| Age | 28–50 |
| Occasion | Team gifting, client appreciation, office Secret Santa |
| Behaviour | Needs ideas within a specific budget band; often shops for multiple people |
| Frustration | Irrelevant suggestions not appropriate for professional contexts |
| Motivation | Appropriate, universally appreciated gifts within approved budget |

---

## 5. Product Overview

The Gift Finder is a three-step web application flow, built as a React single-page application. There is no backend — all AI calls are made directly from the client to Anthropic's API.

**Architecture Note:** Client-only React SPA. No user data is stored. Each session is stateless. The AI prompt is constructed client-side and sent directly to claude-sonnet-4-20250514.

### 5.1 Step 1 — About the Person

Collects four pieces of basic demographic and contextual information. Intentionally short to reduce drop-off.

| Field | Details |
|---|---|
| Age Group | Dropdown — Under 18, 18–25, 26–35, 36–50, 51–65, 65+ |
| Gender | Dropdown — Male, Female, Non-binary, Prefer not to say |
| Budget | Dropdown — Under ₹500, ₹500–₹1,500, ₹1,500–₹5,000, ₹5,000–₹15,000, ₹15,000+ |
| Extra Context | Optional free-text — e.g. "She just moved cities, loves sustainability" |

**UX Behaviour:**
- All fields are optional — user can proceed without filling any
- Selected dropdowns highlight with a gold border to confirm selection
- 'Continue →' CTA is always enabled — no blocking validation

### 5.2 Step 2 — Their Personality

Collects personality traits and hobbies via tap-to-select tag chips. This is the primary personalisation signal used by the AI model.

| Category | Count |
|---|---|
| Personality Traits | 30 options |
| Hobbies & Interests | 35 options |

**UX Behaviour:**
- Tags are pill-shaped chips; selected state fills with gold (#C9A96E)
- A live counter shows the number of selected traits/hobbies
- 'Find Perfect Gifts' CTA is disabled until at least one tag is selected
- Loading state shows spinner with "Crafting your gift list..." copy

### 5.3 Step 3 — Gift Results

Displays six AI-generated gift cards in a single-column vertical list. Each card is independently expandable.

**Gift Card Anatomy:**

| Element | Description |
|---|---|
| Accent bar | 3px vertical gradient bar on left edge, unique colour per card |
| Emoji icon | Contextual emoji cycling by index (🎁 ✨ 💡 🎯 🌟 🎀) |
| Gift name | Bold, specific product name |
| Price range | In ₹, coloured to match the card's accent colour |
| Category pill | Single-word label — Gadget, Book, Experience, Fashion, etc. |
| Shop links | 1–2 direct search URLs to Indian retailers |
| Expand button | '+' icon reveals the AI's reasoning paragraph |
| Reason text | 2–3 sentences tailored to the recipient's specific profile |

**Results Screen Actions:**
- '↺ Start over' — resets all state, returns to Step 1
- Profile chips — gold-tinted summary of key inputs
- '↻ Generate new ideas' — re-calls AI with same profile, returns fresh set of 6
- Shop links open retailer search results in a new tab

---

## 6. AI Integration

### 6.1 Model & API

| | |
|---|---|
| Model | claude-sonnet-4-20250514 |
| Max Tokens | 4,096 |
| API Endpoint | https://api.anthropic.com/v1/messages |
| Call Location | Client-side (browser) |
| Response Format | Strict JSON array of 6 objects |

### 6.2 Prompt Architecture

The prompt is constructed dynamically from the user's inputs and instructs the model to return a JSON array with six gift objects. Each object must contain: name, category, priceRange (in ₹), reason, and where (array of store objects with name and search URL).

**Prompt Design Principle:** The prompt explicitly prohibits generic suggestions (e.g. gift cards), enforces Indian rupee pricing, and specifies Indian retailer search URL formats for Amazon.in, Flipkart, Myntra, Nykaa, and Pepperfry.

**JSON Schema — Each Gift Object:**

| Field | Type & Description |
|---|---|
| name | String — specific product name |
| category | String — single word (Gadget, Book, Fashion, Experience, etc.) |
| priceRange | String — formatted as '₹X,XXX–₹X,XXX' |
| reason | String — 2–3 sentences tailored to recipient's specific traits/hobbies |
| where | Array of {name, url} — 1–2 Indian retailer search URLs |

### 6.3 Error Handling

- API errors: caught in try/catch; displayed as inline error message
- Empty response: explicit check for data.content.length > 0
- Invalid JSON: JSON.parse wrapped in try/catch; error shown to user
- Non-array response: validated with Array.isArray() before rendering

---

## 7. UI / UX Design Specification

| Attribute | Value |
|---|---|
| Theme | Dark — deep navy (#0d0d1a) base |
| Primary Accent | #C9A96E (warm gold) |
| Font | Inter (Google Fonts) — weights 300–700 |
| Border Radius | 6px (tags), 10–11px (inputs), 14px (cards), 22px (panel) |
| Card Background | rgba(255,255,255,0.03) with rgba(255,255,255,0.07) border |
| Backdrop Filter | blur(24px) on main panel — frosted glass effect |
| Animation | fadeUp keyframe (0.45s cubic-bezier) staggered 0.07s per card |

**Background:** Three ambient radial gradient orbs fixed behind the UI — gold (top-left), purple (bottom-right), blue (center). A dot grid overlay fades at the edges using a radial mask.

**Progress Indicator:** Three-step bar above the main card. Each step shows a circular indicator (numbered → gold checkmark when complete → glowing ring when active).

**Accessibility:**
- All form elements use native HTML for keyboard/screen reader support
- Colour contrast exceeds WCAG AA (4.5:1) for body text
- All interactive elements have visible hover states
- Error messages are inline with explicit text

---

## 8. Retailer Integrations

| Retailer | Search URL Format | Category Focus |
|---|---|---|
| Amazon.in | https://www.amazon.in/s?k={gift+name} | General merchandise |
| Flipkart | https://www.flipkart.com/search?q={gift+name} | Electronics, fashion, home |
| Myntra | https://www.myntra.com/{gift-name} | Fashion, beauty, lifestyle |
| Nykaa | https://www.nykaa.com/search/result/?q={gift+name} | Beauty, skincare, wellness |
| Pepperfry | https://www.pepperfry.com/catalogsearch/result/?q={gift+name} | Home décor, furniture |

**Note:** Links are AI-generated search URLs — they always return relevant search results but do not point to a specific product listing. This gives users discovery within context rather than a single brittle product URL.

---

## 9. Feature Backlog & Roadmap

### v1.0 — Current Release
- 3-step personalisation flow (demographics → personality → results)
- 30 personality traits + 35 hobby tags
- 6 AI-generated gift recommendations per session
- Direct shop links to 5 Indian retailers
- Expandable reasoning per card
- Regenerate ideas with same profile
- Profile summary chips on results screen
- Fully client-side — no backend, no auth, no data storage

### v1.1 – v1.2 — Near-term
- Save & share: generate a shareable link to a gift list
- Occasion tagging: Birthday, Anniversary, Housewarming, Festival, etc.
- Recipient name field: personalise the reason text
- Price filter on results after generation
- Affiliate link integration for monetisation

### v2.0 — Medium-term
- User accounts: save past gift lists, mark favourites
- Multi-recipient mode: generate for multiple people in one session
- WhatsApp share: one-tap share of a gift card
- Real-time product availability via retailer APIs
- In-app digital gift card purchase

### Long-term Vision
- Native mobile apps (iOS + Android)
- Group gifting coordination: split costs among friends
- Recipient mood board: hint at preferences without spoiling the surprise
- ML-based learning from historical click-through data

---

## 10. Technical Constraints & Decisions

| Constraint / Decision | Rationale |
|---|---|
| Client-side API calls | Simplest architecture for MVP; no backend to maintain |
| No retailer image fetching | Amazon/Flipkart block CORS requests |
| JSON-only AI response | Structured output ensures reliable parsing |
| max_tokens: 4,096 | 6 detailed objects with reasons/URLs can exceed 1,000 tokens |
| No localStorage/sessionStorage | Not supported in the Claude Artifacts environment |
| Inter font | Universal legibility; specifically requested by stakeholders |
| ₹ currency throughout | Product targets Indian market exclusively |

---

## 11. Out of Scope (v1.0)

- User authentication or accounts
- Persistent data storage of any kind
- Real-time product pricing or inventory
- Payment processing or in-app purchasing
- International markets or non-INR currencies
- Mobile native apps
- Email or push notifications
- A/B testing or analytics instrumentation
- Admin dashboard or content management

---

## 12. Open Questions

| Question | Owner / Notes |
|---|---|
| How should the API key be managed in production? | Engineering — consider a lightweight proxy |
| What is the monetisation model? | Product — affiliate links (v1.1) or premium features (v2.0)? |
| Should occasion be a required field? | UX — improves relevance but adds Step 1 friction |
| How to handle gifts under ₹500 gracefully? | AI prompt tuning needed |
| Should results support bookmarking individual cards? | Product — depends on v1.1 account decision |
| What languages beyond English? | Localisation — Hindi would expand Tier 2/3 city reach |

---

## 13. Appendix

### 13.1 Personality Traits (30)
Introvert · Extrovert · Creative · Analytical · Adventurous · Empathetic · Humorous · Ambitious · Laid-back · Romantic · Minimalist · Collector · Outdoorsy · Homebody · Tech-savvy · Spiritual · Competitive · Generous · Curious · Disciplined · Spontaneous · Nostalgic · Foodie · Social butterfly · Deep thinker · Perfectionist · Free-spirited · Practical · Optimistic · Artistic

### 13.2 Hobbies & Interests (35)
Reading · Gaming · Cooking · Hiking · Photography · Music · Fitness · Travel · Art & Crafts · Gardening · Movies · Fashion · Yoga · DIY Projects · Writing · Skincare & Beauty · Sports · Dancing · Cycling · Meditation · Astrology · Journaling · Podcasts · Stand-up Comedy · Baking · Streetwear & Sneakers · Pets & Animals · Car Enthusiast · Board Games · Volunteering · Cricket · Badminton · Swimming · Calligraphy · Interior Décor

### 13.3 Document History

| Version | Date | Author |
|---|---|---|
| 0.1 — Initial draft | February 2026 | Product Team |
| 1.0 — First release | February 2026 | Product Team |

---

*— End of Document —*