"use client";

import { useState } from "react";

type Goal = "fat" | "muscle" | "strength" | "fit";
type Who = "man" | "woman" | "couple";
type Exp = "never" | "some" | "regular";

const steps = [
  {
    q: "What do you want most?",
    key: "goal",
    options: [
      ["fat", "Lose fat"],
      ["muscle", "Build muscle"],
      ["strength", "Get strong"],
      ["fit", "Feel fit & healthy"],
    ],
  },
  {
    q: "Who's training?",
    key: "who",
    options: [
      ["man", "Just me (man)"],
      ["woman", "Just me (woman)"],
      ["couple", "Me + my partner"],
    ],
  },
  {
    q: "How many days a week can you show up?",
    key: "days",
    options: [
      ["2", "2 days"],
      ["3", "3 days"],
      ["4", "4 days"],
      ["5", "5 days"],
      ["6", "6 days"],
    ],
  },
  {
    q: "Ever trained in a gym before?",
    key: "exp",
    options: [
      ["never", "Never"],
      ["some", "A bit, on and off"],
      ["regular", "Yes, regularly"],
    ],
  },
] as const;

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const schedule: Record<number, string[]> = {
  2: ["Mon", "Thu"],
  3: ["Mon", "Wed", "Fri"],
  4: ["Mon", "Tue", "Thu", "Fri"],
  5: ["Mon", "Tue", "Wed", "Fri", "Sat"],
  6: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

const goalName: Record<Goal, string> = {
  fat: "Fat loss",
  muscle: "Muscle gain",
  strength: "Strength",
  fit: "Fitness",
};

// Which membership fits the program length.
const planFor: Record<Goal, string> = {
  fat: "Quarterly",
  muscle: "Half-yearly",
  strength: "Yearly",
  fit: "Quarterly",
};

export default function Quiz({
  crowd,
  prices,
  onJoin,
  wa,
}: {
  crowd: number[];
  prices: Record<string, number>;
  onJoin: (plan: string) => void;
  wa: (text: string) => string;
}) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Record<string, string>>({});

  const done = step >= steps.length;
  const goal = a.goal as Goal;
  const who = a.who as Who;
  const days = Number(a.days);
  const exp = a.exp as Exp;

  // Quietest 2-hour window while open (from the hourly crowd curve).
  let quiet = 6;
  for (let h = 6; h < 22; h++) if (crowd[h] + crowd[h + 1] < crowd[quiet] + crowd[quiet + 1]) quiet = h;
  const fmt = (h: number) => `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`;

  const boost = exp === "never" ? 1 : 0; // beginners progress fastest
  const projection = {
    fat: { big: `−${Math.round(days * 1 + 1 + boost)} to −${Math.round(days * 1.6 + 1 + boost)} kg`, when: "in 12 weeks" },
    muscle: { big: days >= 4 ? `+${3 + boost} to +${5 + boost} kg` : `+${2 + boost} to +${3 + boost} kg`, when: "of muscle in 16 weeks" },
    strength: { big: days >= 4 ? "+35–50%" : "+20–35%", when: "on your squat, bench and deadlift in 12 weeks" },
    fit: { big: "5 km", when: "without stopping, in 8 weeks" },
  }[goal ?? "fat"];

  const coach =
    who === "woman" && goal !== "fit"
      ? "Neha Tiwari"
      : { fat: "Arjun Mishra", muscle: "Vikram Yadav", strength: "Vikram Yadav", fit: "Sana Qureshi" }[goal ?? "fat"];

  const plan = planFor[goal ?? "fat"];
  const price = who === "couple" ? Math.round(prices[plan] * 2 * 0.85) : prices[plan];
  const summary = `Hi! I took the plan quiz. Goal: ${goalName[goal]}, ${days} days a week, ${who === "couple" ? "with my partner" : "just me"}, experience: ${exp}. I'd like to book my free session.`;

  return (
    <section className="quiz" id="quiz">
      <div className="quiz-head">
        <p className="eyebrow">
          <i className="dot yellow" />
          Your plan · 30 seconds
        </p>
        <h2 className="h2">Answer four questions. Walk out with a plan.</h2>
      </div>

      <div className="quiz-card">
        <div className="quiz-progress" aria-hidden>
          {steps.map((s, i) => (
            <i key={s.key} className={i < step || done ? "full" : i === step ? "now" : ""} />
          ))}
        </div>

        {!done ? (
          <div className="quiz-step" key={step}>
            <p className="quiz-count">
              {step + 1} / {steps.length}
            </p>
            <h3>{steps[step].q}</h3>
            <div className="quiz-options">
              {steps[step].options.map(([v, label]) => (
                <button
                  key={v}
                  className={a[steps[step].key] === v ? "on" : ""}
                  onClick={() => {
                    setA({ ...a, [steps[step].key]: v });
                    setStep(step + 1);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="quiz-back" onClick={() => setStep(step - 1)}>
                ← Back
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-result">
            <div className="qr-main">
              <p className="quiz-count">Your plan</p>
              <h3>
                {goalName[goal]}, {days} days a week
              </h3>
              <p className="qr-big">{projection.big}</p>
              <p className="qr-when">{projection.when}*</p>
              <p className="qr-note">
                *Typical range for members who show up and follow the diet chart. A target, not a promise.
              </p>
            </div>

            <div className="qr-side">
              <div className="qr-block">
                <p className="qr-label">Your week</p>
                <div className="qr-days">
                  {week.map((d) => (
                    <span key={d} className={schedule[days]?.includes(d) ? "on" : ""}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="qr-block">
                <p className="qr-label">Best time to come</p>
                <p>
                  {fmt(quiet)} – {fmt(quiet + 2)}, the floor&apos;s quietest
                </p>
              </div>
              <div className="qr-block">
                <p className="qr-label">Your coach</p>
                <p>{coach}</p>
              </div>
              <div className="qr-block">
                <p className="qr-label">Best membership for this</p>
                <p>
                  {plan}
                  {who === "couple" ? " × 2, couples 15% off" : ""} · <b>₹{price.toLocaleString("en-IN")}</b>
                </p>
              </div>
              <div className="qr-actions">
                <a className="btn big brand" href={wa(summary)}>
                  Book my free session
                </a>
                <button className="btn big ghost" onClick={() => onJoin(plan)}>
                  Join now
                </button>
              </div>
              <button
                className="quiz-back"
                onClick={() => {
                  setA({});
                  setStep(0);
                }}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
