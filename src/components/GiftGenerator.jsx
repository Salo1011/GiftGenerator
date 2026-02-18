import { useState } from "react";

const PERSONALITY_TRAITS = [
  "Introvert", "Extrovert", "Creative", "Analytical", "Adventurous",
  "Empathetic", "Humorous", "Ambitious", "Laid-back", "Romantic",
  "Minimalist", "Collector", "Outdoorsy", "Homebody", "Tech-savvy",
  "Spiritual", "Competitive", "Generous", "Curious", "Disciplined",
  "Spontaneous", "Nostalgic", "Foodie", "Social butterfly", "Deep thinker",
  "Perfectionist", "Free-spirited", "Practical", "Optimistic", "Artistic",
];
const HOBBIES = [
  "Reading", "Gaming", "Cooking", "Hiking", "Photography",
  "Music", "Fitness", "Travel", "Art & Crafts", "Gardening",
  "Movies", "Fashion", "Yoga", "DIY Projects", "Writing",
  "Skincare & Beauty", "Sports", "Dancing", "Cycling", "Meditation",
  "Astrology", "Journaling", "Podcasts", "Stand-up Comedy", "Baking",
  "Streetwear & Sneakers", "Pets & Animals", "Car Enthusiast", "Board Games", "Volunteering",
  "Cricket", "Badminton", "Swimming", "Calligraphy", "Interior Décor",
];
const BUDGETS = ["Under ₹500", "₹500–₹1,500", "₹1,500–₹5,000", "₹5,000–₹15,000", "₹15,000+"];
const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say"];
const AGE_GROUPS = ["Under 18", "18–25", "26–35", "36–50", "51–65", "65+"];
const ACCENT_COLORS = ["#C9A96E", "#8E7BB5", "#6BA3BE", "#B5836E", "#7BAF8E", "#BE6E8E"];

// ── Tag ──────────────────────────────────────────────────────────────────────
const Tag = ({ label, selected, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${label} ${selected ? "selected" : "not selected"}`}
      style={{
        padding: "7px 15px",
        borderRadius: "6px",
        border: selected ? "1.5px solid #1a1a2e" : "1.5px solid rgba(255,255,255,0.15)",
        background: selected ? "#C9A96E" : "rgba(255,255,255,0.05)",
        color: selected ? "#1a1a2e" : "rgba(255,255,255,0.75)",
        fontSize: "12.5px",
        fontFamily: "'Inter', sans-serif",
        cursor: "pointer",
        transition: "all 0.15s ease",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        fontWeight: selected ? "600" : "400",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          e.currentTarget.style.color = "rgba(255,255,255,0.95)";
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.color = "rgba(255,255,255,0.75)";
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        }
      }}
    >
      {label}
    </button>
  );
};

// ── StyledSelect ─────────────────────────────────────────────────────────────
const StyledSelect = ({ label, options, value, onChange, icon }) => {
  const inputId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <label
      htmlFor={inputId}
      style={{
        fontSize: "10.5px",
        fontFamily: "'Inter',sans-serif",
        color: "rgba(255,255,255,0.7)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {icon && <span style={{ opacity: 0.7 }}>{icon}</span>}
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        style={{
          width: "100%",
          padding: "13px 40px 13px 16px",
          borderRadius: "10px",
          border: value
            ? "1.5px solid rgba(201,169,110,0.45)"
            : "1.5px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.04)",
          fontSize: "14px",
          fontFamily: "'Inter',sans-serif",
          color: value ? "#fff" : "rgba(255,255,255,0.5)",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          backdropFilter: "blur(8px)",
          transition: "border-color 0.2s ease",
        }}
      >
        <option value="" style={{ background: "#13131f", color: "#666" }}>
          Select...
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#13131f", color: "#fff" }}>
            {o}
          </option>
        ))}
      </select>
      <svg
        style={{
          position: "absolute",
          right: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          opacity: 0.3,
        }}
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 9l6 6 6-6"
        />
      </svg>
    </div>
  </div>
  );
};

// ── Gift Card ─────────────────────────────────────────────────────────────────
const GiftCardFace = ({ gift, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const icons = ["🎁", "✨", "💡", "🎯", "🌟", "🎀"];

  const hasImage = gift.imageUrl && !imgError;

  const handleExpandClick = () => setExpanded((prev) => !prev);
  const handleExpandKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        overflow: "hidden",
        transition: "all 0.2s ease",
        animation: `fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s both`,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Banner: real product image if available, decorative fallback otherwise */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: hasImage ? "180px" : "90px",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${accent}28 0%, ${accent}08 60%, rgba(0,0,0,0.15) 100%)`,
          transition: "height 0.3s ease",
        }}
      >
        {hasImage ? (
          <>
            <img
              src={gift.imageUrl}
              alt={gift.name}
              onError={() => setImgError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Gradient overlay so badges stay readable */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(13,13,26,0.6) 100%)" }} />
          </>
        ) : (
          <>
            {/* Decorative blurred circles */}
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "110px", height: "110px", borderRadius: "50%", background: `${accent}20`, filter: "blur(24px)" }} />
            <div style={{ position: "absolute", bottom: "-30px", left: "10%", width: "80px", height: "80px", borderRadius: "50%", background: `${accent}14`, filter: "blur(20px)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
            <span style={{ position: "absolute", right: "16px", bottom: "-6px", fontSize: "62px", opacity: 0.12, lineHeight: 1, userSelect: "none" }}>{icons[index % icons.length]}</span>
          </>
        )}
        {/* Category label */}
        <span style={{ position: "absolute", top: "12px", left: "14px", fontFamily: "'Inter',sans-serif", fontSize: "10px", fontWeight: "600", color: hasImage ? "#fff" : accent, letterSpacing: "0.14em", textTransform: "uppercase", background: hasImage ? "rgba(0,0,0,0.45)" : `${accent}18`, padding: "3px 10px", borderRadius: "20px", border: `1px solid ${hasImage ? "rgba(255,255,255,0.2)" : `${accent}30`}`, backdropFilter: "blur(4px)" }}>
          {gift.category}
        </span>
        {/* Price badge */}
        <span style={{ position: "absolute", top: "10px", right: "12px", fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: "700", color: "#1a1a2e", background: accent, padding: "4px 11px", borderRadius: "20px", letterSpacing: "0.01em" }}>
          {gift.priceRange}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: `linear-gradient(to bottom, ${accent}, ${accent}66)`,
          borderRadius: "14px 0 0 14px",
        }}
      />
      <div style={{ padding: "18px 20px 18px 22px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "1px" }}>
            {icons[index % icons.length]}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#fff",
                  lineHeight: "1.3",
                }}
              >
                {gift.name}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              {gift.where?.slice(0, 1).map((store, i) => (
                <a
                  key={i}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "11.5px",
                    color: accent,
                    padding: "2px 10px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    border: `1px solid ${accent}44`,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: "600",
                    transition: "all 0.15s ease",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = accent;
                    e.currentTarget.style.borderColor = `${accent}44`;
                  }}
                >
                  {store.name}
                  <svg width="8" height="8" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M7 7h10v10"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleExpandClick}
            onKeyDown={handleExpandKeyDown}
            tabIndex={0}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse reason" : "Expand to see why this gift is perfect"}
            style={{
              flexShrink: 0,
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              transform: expanded ? "rotate(45deg)" : "none",
              marginTop: "1px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
              <path
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2.5"
                strokeLinecap="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </button>
        </div>
        {expanded && (
          <div
            style={{
              marginTop: "14px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              animation: "fadeUp 0.2s ease both",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.75",
                margin: 0,
              }}
            >
              {gift.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── ProgressBar ───────────────────────────────────────────────────────────────
const ProgressBar = ({ step }) => (
  <nav
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "40px",
      animation: "fadeUp 0.6s ease 0.05s both",
    }}
    aria-label="Progress"
  >
    {["Details", "Personality", "Results"].map((label, i) => {
      const s = i + 1;
      const active = step === s;
      const done = step > s;
      return (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: done
                  ? "#C9A96E"
                  : active
                    ? "rgba(201,169,110,0.12)"
                    : "rgba(255,255,255,0.04)",
                border: done
                  ? "none"
                  : active
                    ? "1.5px solid #C9A96E"
                    : "1.5px solid rgba(255,255,255,0.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.35s ease",
                boxShadow: active ? "0 0 16px rgba(201,169,110,0.2)" : "none",
              }}
            >
              {done ? (
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    stroke="#1a1a2e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
              ) : (
                <span
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "12px",
                    color: active ? "#C9A96E" : "rgba(255,255,255,0.2)",
                    fontWeight: "600",
                  }}
                >
                  {s}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "10.5px",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                transition: "color 0.3s",
                color: active ? "#C9A96E" : done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)",
              }}
            >
              {label}
            </span>
          </div>
          {i < 2 && (
            <div
              style={{
                width: "64px",
                height: "1px",
                background: done
                  ? "linear-gradient(to right,#C9A96E,rgba(201,169,110,0.3))"
                  : "rgba(255,255,255,0.07)",
                margin: "0 4px 18px",
                transition: "background 0.4s ease",
              }}
            />
          )}
        </div>
      );
    })}
  </nav>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function GiftGenerator() {
  const [traits, setTraits] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [gifts, setGifts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const toggle = (list, setList, item) =>
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  const canGenerate = traits.length > 0 || hobbies.length > 0;
  const reset = () => {
    setStep(1);
    setGifts(null);
    setTraits([]);
    setHobbies([]);
    setAge("");
    setGender("");
    setBudget("");
    setExtraContext("");
    setError("");
  };

  const generate = async () => {
    setLoading(true);
    setError("");
    setGifts(null);

    try {
      const res = await fetch("/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, gender, traits, hobbies, budget, extraContext }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      if (!Array.isArray(data)) throw new Error("Invalid response format");
      setGifts(data);
      setStep(3);
    } catch (e) {
      setError(`Something went wrong: ${e.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #0d0d1a; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        select option { background: #13131f !important; color: #fff !important; }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#0d0d1a",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-5%",
            width: "55%",
            height: "55%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.09) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(142,123,181,0.1) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "25%",
            width: "35%",
            height: "35%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(107,163,190,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "52px 20px 80px",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "48px",
            animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "clamp(38px, 6vw, 56px)",
              fontWeight: "700",
              color: "#fff",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
            }}
          >
            The perfect gift,
            <br />
            <span style={{ color: "#C9A96E" }}>thoughtfully found.</span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "14.5px",
              color: "rgba(255,255,255,0.45)",
              marginTop: "16px",
              maxWidth: "380px",
              lineHeight: "1.75",
              margin: "16px auto 0",
            }}
          >
            Tell us about the person. We&apos;ll find something they&apos;ll actually love.
          </p>
        </header>

        <ProgressBar step={step} />

        <main
          style={{
            background: "rgba(255,255,255,0.025)",
            borderRadius: "22px",
            border: "1px solid rgba(255,255,255,0.07)",
            width: "100%",
            maxWidth: "610px",
            padding: "38px",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 96px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}
        >
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "20px" }}>
                <h2
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#fff",
                    marginBottom: "5px",
                  }}
                >
                  About the person
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  The basics help us narrow things down
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <StyledSelect label="Age Group" icon="🎂" options={AGE_GROUPS} value={age} onChange={setAge} />
                <StyledSelect label="Gender" icon="✦" options={GENDERS} value={gender} onChange={setGender} />
              </div>
              <StyledSelect label="Budget" icon="₹" options={BUDGETS} value={budget} onChange={setBudget} />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  htmlFor="extra-context"
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "'Inter',sans-serif",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <span style={{ opacity: 0.7 }}>💬</span> Extra Context
                  <span
                    style={{
                      textTransform: "none",
                      letterSpacing: 0,
                      color: "rgba(255,255,255,0.3)",
                      fontWeight: "400",
                    }}
                  >
                    — optional
                  </span>
                </label>
                <textarea
                  id="extra-context"
                  placeholder="e.g. She just moved to a new city, loves sustainability..."
                  value={extraContext}
                  onChange={(e) => setExtraContext(e.target.value)}
                  rows={3}
                  aria-label="Extra context about the person"
                  style={{
                    padding: "13px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: "13.5px",
                    fontFamily: "'Inter',sans-serif",
                    color: "#fff",
                    outline: "none",
                    resize: "none",
                    lineHeight: "1.6",
                    backdropFilter: "blur(8px)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  padding: "15px",
                  background: "linear-gradient(135deg, #C9A96E 0%, #b8914f 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "11px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  transition: "all 0.22s ease",
                  boxShadow: "0 4px 24px rgba(201,169,110,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,169,110,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(201,169,110,0.3)";
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "20px" }}>
                <h2
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#fff",
                    marginBottom: "5px",
                  }}
                >
                  Their personality
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Select everything that feels like them
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontFamily: "'Inter',sans-serif",
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Personality Traits
                  </span>
                  {traits.length > 0 && (
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "11.5px",
                        color: "#C9A96E",
                        fontWeight: "500",
                      }}
                    >
                      {traits.length} selected
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {PERSONALITY_TRAITS.map((t) => (
                    <Tag
                      key={t}
                      label={t}
                      selected={traits.includes(t)}
                      onClick={() => toggle(traits, setTraits, t)}
                    />
                  ))}
                </div>
              </div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontFamily: "'Inter',sans-serif",
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Hobbies & Interests
                  </span>
                  {hobbies.length > 0 && (
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "11.5px",
                        color: "#C9A96E",
                        fontWeight: "500",
                      }}
                    >
                      {hobbies.length} selected
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {HOBBIES.map((h) => (
                    <Tag
                      key={h}
                      label={h}
                      selected={hobbies.includes(h)}
                      onClick={() => toggle(hobbies, setHobbies, h)}
                    />
                  ))}
                </div>
              </div>
              {error && (
                <div
                  role="alert"
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "13px",
                    color: "#ff8585",
                    background: "rgba(255,80,80,0.07)",
                    border: "1px solid rgba(255,80,80,0.15)",
                    padding: "13px 16px",
                    borderRadius: "10px",
                  }}
                >
                  {error}
                </div>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: "15px 20px",
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "11px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={generate}
                  disabled={!canGenerate || loading}
                  aria-busy={loading}
                  style={{
                    flex: 1,
                    padding: "15px",
                    background: canGenerate
                      ? "linear-gradient(135deg, #C9A96E 0%, #b8914f 100%)"
                      : "rgba(255,255,255,0.05)",
                    color: canGenerate ? "#fff" : "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "11px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: canGenerate ? "pointer" : "default",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "9px",
                    boxShadow: canGenerate ? "0 4px 24px rgba(201,169,110,0.3)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (canGenerate && !loading) {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,169,110,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = canGenerate ? "0 4px 24px rgba(201,169,110,0.3)" : "none";
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(255,255,255,0.25)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Crafting your gift list...
                    </>
                  ) : (
                    "✦ Find Perfect Gifts"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && gifts && (
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  paddingBottom: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#fff",
                      marginBottom: "5px",
                    }}
                  >
                    Your gift picks
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    Tap a card to see why it&apos;s perfect
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    padding: "8px 14px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "8px",
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  }}
                >
                  ↺ Start over
                </button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {[age, gender, budget, ...traits.slice(0, 3), ...hobbies.slice(0, 2)]
                  .filter(Boolean)
                  .map((item, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "4px 10px",
                        background: "rgba(201,169,110,0.07)",
                        border: "1px solid rgba(201,169,110,0.18)",
                        borderRadius: "6px",
                        fontFamily: "'Inter',sans-serif",
                        fontSize: "11px",
                        color: "rgba(201,169,110,0.75)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {gifts.map((gift, i) => (
                  <GiftCardFace key={i} gift={gift} index={i} />
                ))}
              </div>

              <button
                type="button"
                onClick={generate}
                style={{
                  padding: "14px",
                  background: "transparent",
                  border: "1px solid rgba(201,169,110,0.25)",
                  color: "#C9A96E",
                  borderRadius: "11px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,169,110,0.07)";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                }}
              >
                {loading ? (
                  <>
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        border: "2px solid rgba(201,169,110,0.3)",
                        borderTopColor: "#C9A96E",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Regenerating...
                  </>
                ) : (
                  "↻ Generate new ideas"
                )}
              </button>
            </div>
          )}
        </main>

        <p
          style={{
            marginTop: "30px",
            fontFamily: "'Inter',sans-serif",
            fontSize: "11.5px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.07em",
          }}
        >
          Powered by Claude AI · Anthropic
        </p>
      </div>
    </>
  );
}
