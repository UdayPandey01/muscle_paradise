"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Logo from "./Logo";
import Quiz from "./Quiz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PHONE = "919580824464";
const PHONE_SHOWN = "+91 95808 24464";
const ADDRESS =
  "1420/37A, Khadepur Chauraha, near Kameshwar Mandir, Hanumant Vihar, Naubasta, Kanpur, Uttar Pradesh 208021";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "The Muscle Paradise, 1420/37A Khadepur Chauraha, Hanumant Vihar, Naubasta, Kanpur 208021",
)}`;
const INSTAGRAM = "https://www.instagram.com/the_muscleparadise/";
const wa = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// Quick cuts that flash inside the kettlebell during the opening. Swap in the gym's own photos/clips later.
const flashes = [
  "/video/kettle.jpg",
  "/video/overhead.jpg",
  "/video/press.jpg",
  "/video/pullup.jpg",
  "/video/battle.jpg",
  "/video/lunge.jpg",
  "/video/close.jpg",
  "/video/her.jpg",
];

// Kettlebell outline in a 240 x 300 box: round bell with a flat base, handle horns, and the handle window.
// Bell centre is (120, 186). evenodd cuts the window out of the handle.
const KETTLEBELL =
  "M70.5 282 H169.5 A108 108 0 0 0 196.7 110 C210 90 214 62 208 42 C200 12 170 6 120 6 C70 6 40 12 32 42 C26 62 30 90 43.3 110 A108 108 0 0 0 70.5 282 Z " +
  "M66 96 C62 64 82 40 120 40 C158 40 178 64 174 96 C160 82 142 74 120 74 C98 74 80 82 66 96 Z";

// Horizontal tour of the building. video = clip in /public/video, img = photo in /public/photos.
const zones = [
  { video: "battle", level: "Ground floor", name: "Cardio", spec: "Walk in and warm up. Treadmills, bikes and cross-trainers right at the entrance." },
  { video: "press", level: "1st floor", name: "Free Weights", spec: "Dumbbells and benches in rows, so nobody waits for a pair." },
  { img: "floor-iron", level: "1st floor", name: "Machines", spec: "Plate-loaded and pin-select. Every muscle has its machine." },
  { video: "landmine", level: "1st floor", name: "Strength", spec: "Racks, Smith machine and cable crossover. Load it up." },
  { img: "pose-back", level: "Posing corner", name: "Stage Prep", spec: "Mirrors, lights and coaches who've been on stage themselves." },
];

const programs = [
  { video: "battle", name: "Fat Loss", note: "Conditioning + diet chart", len: "12 wks" },
  { video: "press", name: "Muscle Gain", note: "Hypertrophy split, tracked weekly", len: "16 wks" },
  { img: "pose-back", name: "Contest Prep", note: "Posing, peak week, stage day", len: "Show-ready" },
  { video: "close", name: "Personal Training", note: "One coach, one plan, just you", len: "1:1" },
  { video: "overhead", name: "Strength", note: "For boys and girls alike", len: "10 wks" },
  { video: "lunge", name: "Beginners & 40+", note: "Form first, ego never", len: "8 wks" },
];

const coaches = [
  { img: "coach1", name: "Vikram Yadav", role: "Head Coach · Contest Prep", yrs: 11 },
  { img: "coach2", name: "Neha Tiwari", role: "Strength", yrs: 7 },
  { img: "coach3", name: "Arjun Mishra", role: "Fat Loss · Conditioning", yrs: 6 },
  { img: "coach4", name: "Sana Qureshi", role: "Mobility · Rehab", yrs: 8 },
];

const stories = [
  { stat: "−21 kg", who: "Rohit, 34 · Bank clerk", quote: "I joined after my BP report scared me. Eight months later my doctor asked what I'd changed." },
  { stat: "+9 kg", who: "Aman, 22 · Student", quote: "Skinny my whole life. Coach didn't let me skip a single leg day. Hated him. Now I get it." },
  { stat: "Stage", who: "Imran, 27 · First show", quote: "Never thought I'd stand on a stage in trunks. The whole gym came to watch." },
];

const plans = [
  { name: "Monthly", months: 1, price: 1499, per: "/ month", note: "Try us out" },
  { name: "Quarterly", months: 3, price: 3999, per: "/ 3 months", note: "Save ₹498" },
  { name: "Half-yearly", months: 6, price: 6999, per: "/ 6 months", note: "Save ₹1,995" },
  { name: "Yearly", months: 12, price: 11999, per: "/ year", note: "₹33 a day. Less than chai & samosa", best: true },
];

// Typical members on the floor by hour (from biometric logs, once connected).
const crowd = [0, 0, 0, 0, 0, 38, 62, 71, 55, 34, 22, 18, 15, 14, 16, 24, 41, 66, 74, 63, 45, 28, 12, 0];

// DEMO ONLY: recent activity popups. Before launch this must come from real
// sign-ups / bookings (fake activity is misleading and against consumer rules).
const activity = [
  "Ankit from Naubasta booked a free session",
  "Priya from Hanumant Vihar joined Quarterly",
  "Rohan & Simran from Yashoda Nagar joined as a couple",
  "Faizan from Kidwai Nagar booked a free session",
  "Neha from Barra joined Half-yearly",
  "Kartik from Kidwai Nagar started contest prep",
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const split = (s: string) =>
  s.split(" ").map((w, i) => (
    <span className="w" key={i}>
      <span>{w}&nbsp;</span>
    </span>
  ));

const words = (s: string) =>
  s.split(" ").map((w, i) => (
    <span className="mw" key={i}>
      {w}{" "}
    </span>
  ));

export default function Home() {
  const main = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [hovered, setHovered] = useState(-1);
  const [join, setJoin] = useState<(typeof plans)[number] | null>(null);
  const [memberId, setMemberId] = useState("");
  const [toast, setToast] = useState(-1);

  useEffect(() => {
    const update = () => setNow(new Date());
    const t = setTimeout(update);
    const id = setInterval(update, 30000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, []);

  // One activity popup every ~12s, visible for 5s.
  useEffect(() => {
    let i = 0;
    let hide: ReturnType<typeof setTimeout>;
    const show = () => {
      setToast(i++ % activity.length);
      hide = setTimeout(() => setToast(-1), 5000);
    };
    const first = setTimeout(show, 12000);
    const id = setInterval(show, 14000);
    return () => {
      clearTimeout(first);
      clearTimeout(hide);
      clearInterval(id);
    };
  }, []);

  const ist = now ? new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })) : null;
  const hour = ist?.getHours() ?? 18;
  const open = hour >= 5 && hour < 23;
  const onFloor = crowd[hour];
  const mood = !open ? "Closed" : onFloor < 25 ? "Quiet" : onFloor < 55 ? "Steady" : "Packed";

  // Joining fee waived until the end of this month (IST).
  const deadline = ist ? new Date(ist.getFullYear(), ist.getMonth() + 1, 0, 23, 59) : null;
  const left = deadline && ist ? deadline.getTime() - ist.getTime() : 0;
  const leftText = `${Math.floor(left / 864e5)}d ${Math.floor((left / 36e5) % 24)}h ${Math.floor((left / 6e4) % 60)}m`;
  const monthEnd = deadline?.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const openPlan = (name: string) => {
    setMemberId("");
    setJoin(plans.find((p) => p.name === name) ?? plans[1]);
  };

  useGSAP(
    () => {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".loader, .flash, .curtain", { autoAlpha: 0 });
        gsap.set(".nav, .mobile-bar, .side-stack, .hero-content", { autoAlpha: 1 });
      });

      mm.add({ desktop: "(min-width: 900px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        const { desktop, motion } = ctx.conditions!;
        if (!motion) return;

        // ---- Hero shrinks into a framed card while the name splits apart.
        // Built after the opening so the two don't fight.
        const heroScroll = () =>
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 0.6,
                refreshPriority: 2,
              },
            })
            .fromTo(
              ".hero-media",
              { clipPath: "inset(0% 0% 0% 0%)" },
              {
                clipPath: desktop ? "inset(16% 24% 16% 24%)" : "inset(22% 6% 22% 6%)",
                ease: "none",
                immediateRender: false,
              },
            )
            .to(".hero-media video", { scale: 1.15, ease: "none" }, 0)
            .to(".hero-word.top", { xPercent: -8, ease: "none" }, 0)
            .to(".hero-word.bottom", { xPercent: 8, ease: "none" }, 0)
            .fromTo(".hero-meta", { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.3, immediateRender: false }, 0)
            .fromTo(
              ".hero-mid",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, ease: "none", duration: 0.5, immediateRender: false },
              0.4,
            );

        // ---- Opening: quick cuts flash inside a kettlebell-shaped window (his logo),
        // then the kettlebell rushes at you until the video fills the screen.
        lenis.stop();
        // The kettlebell is drawn in a 240-wide box; its bell centre is (120, 186).
        const shapes = document.querySelectorAll(".kb-shape");
        const kb = { size: 0, y: 0, r: 0 };
        const place = () =>
          shapes.forEach((el) =>
            el.setAttribute(
              "transform",
              `translate(${innerWidth / 2} ${innerHeight / 2 + kb.y}) rotate(${kb.r}) scale(${kb.size / 240}) translate(-120 -186)`,
            ),
          );
        const small = Math.min(innerWidth * 0.6, innerHeight * 0.46, 380);
        kb.size = small;
        kb.y = -innerHeight;
        kb.r = -14;
        place();
        const big = Math.max(innerWidth, innerHeight) * 4;
        const counter = { v: 0 };
        const countEl = document.querySelector(".loader-count");
        const intro = gsap.timeline({
          onComplete: () => {
            heroScroll();
            lenis.start();
            ScrollTrigger.refresh();
          },
        });
        intro
          // drop it in like it was let go from overhead, then a heavy landing
          .to(kb, { y: 0, duration: 0.85, ease: "bounce.out", onUpdate: place }, 0.1)
          .to(kb, { r: 0, duration: 1.1, ease: "elastic.out(1, 0.35)", onUpdate: place }, 0.35)
          .fromTo(".hero", { y: 0 }, { y: 7, duration: 0.05, yoyo: true, repeat: 3, ease: "none" }, 0.62)
          // slow spin of the ring lettering while it rests
          .fromTo(".kb-ring-text", { attr: { "letter-spacing": 6 } }, { attr: { "letter-spacing": 3.2 }, duration: 2, ease: "power2.out" }, 0.4)
          .to(
            counter,
            {
              v: 100,
              duration: 2.7,
              ease: "power2.inOut",
              onUpdate: () => {
                if (countEl) countEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
              },
            },
            0,
          )
          .from(".loader-line > span", { yPercent: 110, duration: 0.9, ease: "expo.out" }, 0.3);
        gsap.utils.toArray<HTMLElement>(".flash").forEach((el, i) => intro.set(el, { autoAlpha: 1 }, 0.45 + i * 0.27));
        intro
          .set(".flash", { autoAlpha: 0 }, 2.75)
          .to(".loader-inner", { opacity: 0, y: 20, duration: 0.5, ease: "power2.in" }, 2.7)
          .to(".kb-overlay", { opacity: 0, duration: 0.35 }, 2.75)
          .to(kb, { size: big, duration: 1.3, ease: "power4.in", onUpdate: place }, 2.75)
          .set(".curtain", { autoAlpha: 0 }, 4.05)
          .set(".loader", { autoAlpha: 0 }, 4.05)
          .set(".hero-content, .nav, .mobile-bar", { autoAlpha: 1 }, 4.0)
          .from(".hero-word .ch", { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.035 }, 4.0)
          .from(".hero-fade", { opacity: 0, y: 16, duration: 1, ease: "power3.out", stagger: 0.08 }, 4.35)
          .from(".nav", { y: -16, opacity: 0, duration: 0.8, ease: "power3.out" }, 4.2);

        // Offer + activity cards only after the floor tour, so they never cover the big moments.
        ScrollTrigger.create({
          trigger: ".numbers",
          start: "top 80%",
          endTrigger: "html",
          end: "bottom bottom",
          onToggle: (self) => gsap.to(".side-stack", { autoAlpha: self.isActive ? 1 : 0, duration: 0.4 }),
        });

        // ---- First-draft scroll effects.
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) =>
          gsap.from(el.querySelectorAll(".w > span"), {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }),
        );
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }),
        );
        gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) =>
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          ),
        );
        gsap.fromTo(
          ".manifesto .mw",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".manifesto", start: "top 75%", end: "bottom 55%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const v = { n: 0 };
          gsap.to(v, {
            n: Number(el.dataset.count),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
            onUpdate: () => (el.textContent = Math.round(v.n).toLocaleString("en-IN")),
          });
        });
        gsap.from(".bar", {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1,
          ease: "expo.out",
          stagger: 0.03,
          scrollTrigger: { trigger: ".bars", start: "top 85%" },
        });

        if (desktop) {
          // The floor tour scrolls sideways while pinned.
          const track = document.querySelector<HTMLElement>(".floor-track")!;
          const dist = () => track.scrollWidth - window.innerWidth;
          gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: ".floor",
              start: "top top",
              end: () => "+=" + dist(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          });
          const x = gsap.quickTo(preview.current, "x", { duration: 0.5, ease: "power3" });
          const y = gsap.quickTo(preview.current, "y", { duration: 0.5, ease: "power3" });
          const move = (e: MouseEvent) => {
            x(e.clientX);
            y(e.clientY);
          };
          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        }
      });

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    },
    { scope: main },
  );

  return (
    <main ref={main}>
      {/* OPENING */}
      <div className="loader" aria-hidden>
        <div className="loader-inner">
          <p className="loader-line mono">
            <span>The Muscle Paradise · Date the weight</span>
          </p>
          <p className="loader-count">000</p>
        </div>
      </div>

      <nav className="nav">
        <a href="#top" className="logo" aria-label="The Muscle Paradise home">
          <Logo variant="mark" />
          THE MUSCLE<span>/</span>PARADISE
        </a>
        <div className="nav-mid mono">
          <a href="#floor">The Floors</a>
          <a href="#stage">Stage</a>
          <a href="#programs">Programs</a>
          <a href="#plans">Plans</a>
        </div>
        <div className="nav-right mono">
          <span className="status">
            <i className={open ? "on" : ""} />
            {ist
              ? `${open ? "Open" : "Closed"} · ${ist.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })} IST`
              : "Kanpur"}
          </span>
          <a href="#plans" className="btn">
            Join
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-media">
          <video src="/video/hero.mp4" poster="/video/hero.jpg" autoPlay muted loop playsInline />
          {flashes.map((src) => (
            <Image key={src} className="flash" src={src} alt="" fill sizes="40vw" />
          ))}
        </div>
        {/* Opening curtain: a black sheet with his kettlebell cut out of it. */}
        <svg className="curtain" aria-hidden>
          <defs>
            <mask id="kb-hole">
              <rect width="100%" height="100%" fill="#fff" />
              <g className="kb-shape">
                <path fill="#000" fillRule="evenodd" d={KETTLEBELL} />
              </g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#0b0b0a" mask="url(#kb-hole)" />
          {/* The iron itself: rim, base and the sign's ring lettering, moving with the window. */}
          <g className="kb-shape kb-overlay">
            <path id="kb-ring" d="M33.5 154.5 A92 92 0 1 0 206.5 154.5" fill="none" />
            <path d={KETTLEBELL} fill="none" fillRule="evenodd" stroke="#f5a524" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            <path d="M58 290 H182" stroke="#f5a524" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            <text className="kb-ring-text" textAnchor="middle">
              <textPath href="#kb-ring" startOffset="50%">
                THE MUSCLE PARADISE · DATE THE WEIGHT
              </textPath>
            </text>
          </g>
        </svg>
        <div className="hero-content">
          <div className="hero-meta hero-fade mono">
            <p>
              (Unisex · Boys &amp; Girls)
              <br />
              Naubasta, Kanpur
            </p>
            <p className="right">
              Two floors · 5 AM – 11 PM
              <br />
              First session free
            </p>
          </div>
          <h1 className="hero-title" aria-label="The Muscle Paradise">
            {[
              ["MUSCLE", "top"],
              ["PARADISE", "bottom"],
            ].map(([word, pos]) => (
              <span className={`hero-word ${pos}`} key={word} aria-hidden>
                {word.split("").map((c, i) => (
                  <span className="ch" key={i}>
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-mid display">Date the weight.</p>
          <div className="hero-bottom hero-meta">
            <p className="hero-fade lede">
              Heavy iron upstairs, cardio downstairs, coaches who watch your form, and members who take it all the way to
              the stage.
            </p>
            <a className="hero-fade btn big" href={wa("Hi! I'd like to book my free first session at The Muscle Paradise.")}>
              First session free <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden>
        <div className="ticker-track">
          {[0, 1].map((k) => (
            <span key={k}>
              NO SHORTCUTS ✕ OPEN 5 AM – 11 PM ✕ TWO FLOORS ✕ BOYS & GIRLS ✕ CONTEST PREP ✕ NAUBASTA, KANPUR ✕ DATE THE
              WEIGHT ✕&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="manifesto">
        <p className="mono label">(01) — What we are</p>
        <p className="manifesto-text">
          {words("We're not a wellness lounge. No juice bar, no mood lighting.")}
          <span className="pill" data-clip>
            <video src="/video/kettle.mp4" autoPlay muted loop playsInline />
          </span>{" "}
          {words(
            "Just heavy iron, honest coaching, and a floor where the uncle doing his first push-up gets the same respect as the guy",
          )}
          <span className="pill" data-clip>
            <video src="/video/landmine.mp4" autoPlay muted loop playsInline />
          </span>{" "}
          <span className="mw">prepping</span> <span className="mw">for</span> <span className="mw accent">stage.</span>
        </p>
      </section>

      {/* FLOOR */}
      <section className="floor" id="floor">
        <div className="floor-track">
          <div className="floor-intro">
            <p className="mono label">(02) — The floors</p>
            <h2 className="display" data-split>
              {split("Two floors. Zero waiting.")}
            </h2>
            <p className="muted" data-reveal>
              Cardio on the ground floor, every weight and machine upstairs. Scroll through the building →
            </p>
          </div>
          {zones.map((z, i) => (
            <article className="zone" key={z.name}>
              <div className="zone-img">
                {z.video ? (
                  <video src={`/video/${z.video}.mp4`} poster={`/video/${z.video}.jpg`} autoPlay muted loop playsInline preload="metadata" />
                ) : (
                  <Image src={`/photos/${z.img}.jpg`} alt={z.name} fill sizes="(min-width: 900px) 40vw, 100vw" />
                )}
                <span className="zone-level mono">{z.level}</span>
              </div>
              <div className="zone-meta">
                <span className="mono">0{i + 1}</span>
                <h3>{z.name}</h3>
                <p className="muted">{z.spec}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section className="numbers">
        {[
          { n: 2, s: "", l: "Floors · cardio & weights" },
          { n: 18, s: " hrs", l: "Open every day" },
          { n: 15, s: "%", l: "Off when couples join" },
          { n: 0, s: "", l: "Rupees for your first session", pre: "₹" },
        ].map((x) => (
          <div className="num" key={x.l} data-reveal>
            <p className="display">
              {x.pre}
              <span data-count={x.n}>{x.n}</span>
              {x.s}
            </p>
            <p className="mono">{x.l}</p>
          </div>
        ))}
      </section>

      {/* STAGE */}
      <section className="her stage" id="stage">
        <div className="her-img" data-clip>
          <Image src="/photos/pose-back.jpg" alt="Member hitting a back pose" fill sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
        <div className="her-copy">
          <p className="mono label">(03) — From this floor to the stage</p>
          <h2 className="display" data-split>
            {split("Some come to get fit. Some come to compete.")}
          </h2>
          <ul>
            {[
              "Posing practice with coaches who've competed",
              "Off-season building plans",
              "Peak week & stage-day diet",
              "The whole gym backstage on show day",
            ].map((t, i) => (
              <li key={t} data-reveal>
                <span className="mono">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ul>
          <a
            className="btn big accent-btn"
            href={wa("Hi! I want to train for a bodybuilding / physique show. Can we talk about contest prep?")}
            data-reveal
          >
            Train for the stage <span>↗</span>
          </a>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="programs" id="programs">
        <div className="section-head">
          <p className="mono label">(04) — Programs</p>
          <h2 className="display" data-split>
            {split("Pick a goal. We'll write the plan.")}
          </h2>
        </div>
        <ul className="program-list" onMouseLeave={() => setHovered(-1)}>
          {programs.map((p, i) => (
            <li key={p.name} onMouseEnter={() => setHovered(i)} data-reveal>
              <span className="mono">0{i + 1}</span>
              <h3>{p.name}</h3>
              <p className="muted">{p.note}</p>
              <span className="mono len">{p.len}</span>
              <a href={wa(`Hi! I'm interested in the ${p.name} program.`)} aria-label={`Ask about ${p.name}`}>
                ↗
              </a>
            </li>
          ))}
        </ul>
        <div className={`preview ${hovered >= 0 ? "show" : ""}`} ref={preview} aria-hidden>
          {programs.map((p, i) =>
            p.video ? (
              <video
                key={p.name}
                src={`/video/${p.video}.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className={i === hovered ? "on" : ""}
              />
            ) : (
              <Image key={p.name} src={`/photos/${p.img}.jpg`} alt="" fill sizes="320px" className={i === hovered ? "on" : ""} />
            ),
          )}
        </div>
      </section>

      {/* TOGETHER */}
      <section className="her">
        <div className="her-img" data-clip>
          <video src="/video/her.mp4" poster="/video/her.jpg" autoPlay muted loop playsInline />
        </div>
        <div className="her-copy">
          <p className="mono label">(05) — Unisex, properly</p>
          <h2 className="display" data-split>
            {split("Boys and girls. Same floor, same respect.")}
          </h2>
          <ul>
            {[
              "No separate timings. Train whenever suits you",
              "Every machine and rack, open to everyone",
              "Coaches on both floors, every shift",
              "CCTV on the floor, never in private areas",
              "Zero-tolerance policy. Actually enforced.",
            ].map((t, i) => (
              <li key={t} data-reveal>
                <span className="mono">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COACHES */}
      <section className="coaches" id="coaches">
        <div className="section-head">
          <p className="mono label">(06) — Coaches</p>
          <h2 className="display" data-split>
            {split("They'll know your name by day two.")}
          </h2>
        </div>
        <div className="coach-grid">
          {coaches.map((c) => (
            <article className="coach" key={c.name} data-reveal>
              <div className="coach-img">
                <Image src={`/img/${c.img}.jpg`} alt={c.name} fill sizes="(min-width: 900px) 25vw, 50vw" />
              </div>
              <h3>{c.name}</h3>
              <p className="mono">
                {c.role} · {c.yrs} yrs
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section className="stories">
        <p className="mono label">(07) — Real members</p>
        <div className="story-grid">
          {stories.map((s) => (
            <figure className="story" key={s.who} data-reveal>
              <p className="display stat">{s.stat}</p>
              <blockquote>“{s.quote}”</blockquote>
              <figcaption className="mono">{s.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Quiz
        crowd={crowd}
        prices={Object.fromEntries(plans.map((p) => [p.name, p.price]))}
        onJoin={openPlan}
        wa={wa}
      />

      {/* LIVE FLOOR */}
      <section className="live">
        <div className="live-head">
          <p className="mono label">
            (09) — Right now <span className="tag">Live from biometric entry · preview</span>
          </p>
          <p className="display live-num">
            {open ? onFloor : "—"}
            <span> {mood}</span>
          </p>
          <p className="muted">
            {open
              ? `people across both floors at ${hour}:00. ${mood === "Quiet" ? "Perfect time for squats." : mood === "Steady" ? "Racks free, go lift." : "Peak hour. Expect to share."}`
              : "We open at 5 AM. Early birds get the racks."}
          </p>
        </div>
        <div className="bars" aria-label="Typical crowd by hour">
          {crowd.slice(5, 23).map((c, i) => (
            <div key={i} className={`bar-wrap ${i + 5 === hour ? "now" : ""}`}>
              <div className="bar" style={{ height: `${(c / 80) * 100}%` }} />
              <span className="mono">{i + 5}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section className="plans" id="plans">
        <div className="section-head">
          <p className="mono label">(10) — Membership</p>
          <h2 className="display" data-split>
            {split("Simple prices. Pay by UPI.")}
          </h2>
        </div>
        <div className="plan-grid">
          {plans.map((p) => (
            <article className={`plan ${p.best ? "best" : ""}`} key={p.name} data-reveal>
              <div className="plan-top">
                <h3>{p.name}</h3>
                {p.best && <span className="mono tag">Best value</span>}
              </div>
              <p className="display price">{inr(p.price)}</p>
              <p className="mono muted">
                {p.per} · {p.note}
              </p>
              <button className="btn" onClick={() => openPlan(p.name)}>
                Join {p.name} <span>→</span>
              </button>
            </article>
          ))}
        </div>
        <p className="addons mono" data-reveal>
          + Personal training ₹4,000/mo &nbsp;·&nbsp; Couples save 15% &nbsp;·&nbsp; Students save 10% with ID &nbsp;·&nbsp; GST
          invoice on every payment
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-video">
          <video src="/video/pullup.mp4" poster="/video/pullup.jpg" autoPlay muted loop playsInline preload="metadata" />
        </div>
        <div className="footer-cta">
          <h2 className="display" data-split>
            {split("Stop scrolling. Come lift.")}
          </h2>
          <div className="footer-links">
            <a className="btn big" href={wa("Hi! I'd like to visit The Muscle Paradise.")}>
              WhatsApp us <span>↗</span>
            </a>
            <a className="btn ghost big" href={MAPS} target="_blank" rel="noreferrer">
              Get directions <span>↗</span>
            </a>
          </div>
        </div>
        <div className="footer-info">
          <div>
            <p className="mono label">Find us</p>
            <p>{ADDRESS}</p>
          </div>
          <div>
            <p className="mono label">Hours</p>
            <p>
              Mon – Sat · 5:00 – 23:00
              <br />
              Sunday · 6:00 – 12:00
            </p>
          </div>
          <div>
            <p className="mono label">Talk</p>
            <p>
              <a href={`tel:+${PHONE}`}>{PHONE_SHOWN}</a>
              <br />
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                @the_muscleparadise ↗
              </a>
            </p>
          </div>
        </div>
        <p className="footer-mark" aria-hidden>
          MUSCLE PARADISE
        </p>
        <div className="footer-base mono">
          <span>© {ist?.getFullYear()} The Muscle Paradise, Kanpur · Date the weight</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      <a className="wa-float mono" href={wa("Hi Muscle Paradise!")} aria-label="Chat on WhatsApp">
        <i /> WhatsApp
      </a>

      {/* Offer + activity (bottom left) */}
      <div className="side-stack">
        {toast >= 0 && (
          <p className="toast mono" key={toast}>
            <i />
            {activity[toast]}
          </p>
        )}
        {ist && (
          <a href="#plans" className="offer mono">
            <b>No joining fee</b> till {monthEnd}
            <span>{leftText} left</span>
          </a>
        )}
      </div>

      {/* Mobile sticky actions */}
      <div className="mobile-bar">
        <a className="btn accent-btn" href="#quiz">
          Get my plan
        </a>
        <a className="btn" href={wa("Hi! I'd like to book my free first session at The Muscle Paradise.")}>
          Free session
        </a>
      </div>

      {/* JOIN SHEET */}
      {join && (
        <div className="sheet-bg" onClick={() => setJoin(null)} data-lenis-prevent>
          <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal aria-label="Join">
            <button className="close mono" onClick={() => setJoin(null)}>
              Close ✕
            </button>
            {!memberId ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMemberId("MP-" + Math.floor(1000 + Math.random() * 9000));
                }}
              >
                <p className="mono label">You picked</p>
                <h3 className="display">
                  {join.name} · {inr(join.price)}
                </h3>
                <label>
                  <span className="mono">Full name</span>
                  <input required name="name" autoComplete="name" />
                </label>
                <label>
                  <span className="mono">Mobile</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    placeholder="10-digit number"
                  />
                </label>
                <label>
                  <span className="mono">Start date</span>
                  <input required name="start" type="date" />
                </label>
                <button className="btn big" type="submit">
                  Pay {inr(join.price)} with UPI <span>→</span>
                </button>
                <p className="mono muted small">UPI · Cards · Net banking · EMI on yearly. Demo — Razorpay connects in phase 2.</p>
              </form>
            ) : (
              <div className="done">
                <p className="mono label">Payment received</p>
                <h3 className="display">You&apos;re in.</h3>
                <p>
                  Membership <b>{memberId}</b> is active. Your receipt and GST invoice are on WhatsApp. Put your finger on
                  the scanner at the door — it already knows you.
                </p>
                <button className="btn big" onClick={() => setJoin(null)}>
                  See you on the floor <span>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
