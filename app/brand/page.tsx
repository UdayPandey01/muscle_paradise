import type { Metadata } from "next";
import Link from "next/link";
import Logo from "../Logo";

export const metadata: Metadata = {
  title: "Brand — The Muscle Paradise",
};

const palette = [
  { name: "Amber", hex: "#F5A524", note: "The sign glow. Logo, highlights, key buttons." },
  { name: "Ember", hex: "#E2861C", note: "Edges and hover states." },
  { name: "Iron", hex: "#0E0E0E", note: "Backgrounds, the monogram disc." },
  { name: "Chalk", hex: "#F4F1EA", note: "Monogram and body text." },
  { name: "Leather", hex: "#2A1608", note: "Ring text on amber." },
];

export default function Brand() {
  return (
    <main className="brand-page">
      <header className="brand-head">
        <Link href="/" className="brand-back">
          ← Back to site
        </Link>
        <p className="eyebrow">Brand refresh · draft</p>
        <h1 className="h2">The Muscle Paradise</h1>
        <p className="brand-intro">
          Same kettlebell, same MP monogram, same &ldquo;Date the weight&rdquo;. Redrawn so it&apos;s sharp at every size:
          true geometry for the bell, one stroke weight across the monogram, cleaner ring type, and a glow that matches the
          lit sign at the gym.
        </p>
      </header>

      <section className="brand-hero">
        <Logo className="brand-badge" />
      </section>

      <section className="brand-grid">
        <figure className="tile dark">
          <Logo />
          <figcaption>Primary badge</figcaption>
        </figure>
        <figure className="tile cream">
          <Logo />
          <figcaption>On light</figcaption>
        </figure>
        <figure className="tile dark">
          <Logo variant="mark" />
          <figcaption>Mark · small sizes, favicon, stickers</figcaption>
        </figure>
        <figure className="tile wide dark">
          <div className="lockup">
            <Logo variant="mark" />
            <p>
              <b>The Muscle Paradise</b>
              <span>Date the weight</span>
            </p>
          </div>
          <figcaption>Horizontal lockup · website, letterheads, invoices</figcaption>
        </figure>
        <figure className="tile amber">
          <div className="app-icon">
            <Logo variant="mark" />
          </div>
          <figcaption>App icon</figcaption>
        </figure>
        <figure className="tile wide dark">
          <div className="member-card">
            <Logo variant="mark" />
            <div>
              <p className="mc-name">Rahul Verma</p>
              <p className="mc-meta">MP-2481 · Yearly · Valid till Nov 2027</p>
            </div>
            <p className="mc-tag">Date the weight</p>
          </div>
          <figcaption>Membership card</figcaption>
        </figure>
        <figure className="tile dark">
          <div className="tee">
            <Logo />
          </div>
          <figcaption>Staff tee / merch</figcaption>
        </figure>
      </section>

      <section className="brand-palette">
        {palette.map((c) => (
          <div key={c.name} className="swatch">
            <i style={{ background: c.hex }} />
            <b>{c.name}</b>
            <span>{c.hex}</span>
            <p>{c.note}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
