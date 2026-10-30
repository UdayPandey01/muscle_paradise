import type { Metadata } from "next";
import Logo from "../Logo";

export const metadata: Metadata = {
  title: "Owner dashboard (demo) — The Muscle Paradise",
  robots: { index: false },
};

// DEMO DATA: in phase 2 this comes from the fingerprint machine, Razorpay and the website quiz.
const kpis = [
  { label: "On the floor now", value: "47", note: "live from the door", live: true },
  { label: "Check-ins today", value: "186", note: "+12 vs last Monday" },
  { label: "Revenue this month", value: "₹4,82,300", note: "+18% vs last month" },
  { label: "Active members", value: "1,214", note: "+36 this month" },
  { label: "New website leads", value: "23", note: "this week, from the plan quiz" },
];

const checkins = [162, 171, 158, 149, 183, 176, 98, 168, 179, 165, 152, 190, 181, 104];

const renewals = [
  { name: "Amit Shukla", plan: "Quarterly", ends: "Tomorrow" },
  { name: "Pooja Verma", plan: "Monthly", ends: "Wed" },
  { name: "Saurabh Gupta", plan: "Half-yearly", ends: "Thu" },
  { name: "Ritika Pandey", plan: "Monthly", ends: "Sat" },
];

const atRisk = [
  { name: "Manish Tripathi", last: "14 days ago", plan: "Yearly" },
  { name: "Sneha Awasthi", last: "11 days ago", plan: "Quarterly" },
  { name: "Imran Khan", last: "10 days ago", plan: "Monthly" },
];

const leads = [
  { name: "Ankit", goal: "Fat loss", days: 4, when: "2 hrs ago" },
  { name: "Rohan & Simran", goal: "Feel fit (couple)", days: 3, when: "5 hrs ago" },
  { name: "Neha", goal: "Get strong (women's batch)", days: 5, when: "Yesterday" },
];

const share = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;

export default function Owner() {
  const max = Math.max(...checkins);
  return (
    <main className="owner">
      <header className="owner-head">
        <Logo variant="mark" className="owner-logo" />
        <div>
          <p className="eyebrow">Owner view · demo of phase 2</p>
          <h1 className="h2">Good morning. Here&apos;s your gym at 7:00 AM.</h1>
        </div>
      </header>

      <section className="kpis">
        {kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <p className="qr-label">
              {k.live && <i className="live-dot" />}
              {k.label}
            </p>
            <p className="kpi-value">{k.value}</p>
            <p className="kpi-note">{k.note}</p>
          </div>
        ))}
      </section>

      <section className="owner-grid">
        <div className="panel wide">
          <p className="qr-label">Check-ins, last 14 days</p>
          <div className="mini-bars">
            {checkins.map((c, i) => (
              <i key={i} style={{ height: `${(c / max) * 100}%` }} className={i === checkins.length - 1 ? "now" : ""} />
            ))}
          </div>
        </div>

        <div className="panel">
          <p className="qr-label">Renewals due this week · ₹18,996</p>
          {renewals.map((r) => (
            <div className="row" key={r.name}>
              <span>
                <b>{r.name}</b>
                {r.plan} · ends {r.ends}
              </span>
              <a
                className="btn"
                href={share(`Hi ${r.name.split(" ")[0]}, your ${r.plan} membership at The Muscle Paradise ends ${r.ends.toLowerCase()}. Renew on UPI here: [link]. Date the weight!`)}
              >
                Remind
              </a>
            </div>
          ))}
        </div>

        <div className="panel">
          <p className="qr-label">Might quit · no visit in 10+ days</p>
          {atRisk.map((r) => (
            <div className="row" key={r.name}>
              <span>
                <b>{r.name}</b>
                Last came {r.last} · {r.plan}
              </span>
              <a
                className="btn ghost"
                href={share(`Hi ${r.name.split(" ")[0]}, we've missed you at The Muscle Paradise! Your coach has a quick comeback plan ready. See you this week?`)}
              >
                Nudge
              </a>
            </div>
          ))}
        </div>

        <div className="panel">
          <p className="qr-label">New leads from the website quiz</p>
          {leads.map((l) => (
            <div className="row" key={l.name}>
              <span>
                <b>{l.name}</b>
                {l.goal} · {l.days} days/week · {l.when}
              </span>
              <a
                className="btn brand"
                href={share(`Hi ${l.name}! Thanks for taking our plan quiz. Your free session is ready. When can you come in?`)}
              >
                Reply
              </a>
            </div>
          ))}
        </div>
      </section>

      <p className="owner-foot">
        Everything here updates on its own: the fingerprint machine feeds attendance, Razorpay feeds payments, and the
        website feeds leads. One tap sends the WhatsApp.
      </p>
    </main>
  );
}
