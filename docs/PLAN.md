# Muscle Paradise — Website Plan

Unisex gym in Kanpur, Uttar Pradesh. The client asked for a "crazy" site and left the decisions to us.
Goal: someone opens the site on their phone and wants to join within 30 seconds.

## What the best gym sites do (and what we steal)

| Site | What they nail | What we take |
| --- | --- | --- |
| Equinox | Cinematic full-screen video, luxury feel, very little text | Hero video, bold type, premium mood |
| Barry's | Dark theme, red accents, energy, class booking front and center | Dark + one loud accent colour, "Book / Join" always visible |
| Third Space (London) | Beautiful facility photography, a tour of every zone | "Explore the floor" section, zone by zone |
| Orangetheory | Explains the workout science simply, first class free | "Free trial" as the main hook |
| Cult.fit (India) | Indian pricing, UPI, app-like flow, trainers shown | Clear INR plans, UPI pay, trainer cards |
| Gold's Gym | Strong brand, transformations, community | Before/after transformation wall |

Common pattern: one strong promise in the hero, real photos (never stock), pricing that's easy to understand,
and a single obvious action — **Join / Free Trial**.

## Look and feel

- Dark background, one loud accent (electric red or neon lime — show both to client), huge bold headlines.
- Real photos and short video clips of the actual gym, trainers and members. This matters more than any animation.
- Motion: scroll-reveal text, counter animations (members, kg lifted, years), a looping hero video, smooth marquee of transformations.
- Mobile first. Most Kanpur visitors come from Instagram / Google Maps on Android phones on 4G — must load fast.
- Hindi + English toggle (simple, big trust win locally).

## Pages / sections (draft = one long homepage)

1. **Hero** — gym video loop, "Kanpur's Muscle Paradise", buttons: *Start Free Trial* and *See Plans*.
2. **Why us** — equipment, trainers, timings, hygiene, parking, AC, steam/locker if available.
3. **Explore the gym** — zones: free weights, machines, cardio, functional, ladies' area (if any), changing rooms.
4. **Programs** — weight loss, muscle gain, strength, personal training, women's fitness, seniors.
5. **Trainers** — photo, specialty, certifications, Instagram link.
6. **Transformations** — before/after slider with member stories (with their permission).
7. **Plans & pricing** — Monthly / Quarterly / Half-yearly / Yearly, PT add-on, couple plan, student plan. "Most popular" badge.
8. **Women's safety & comfort** — big one for a unisex gym in UP: female trainers, women-only hours (if offered), CCTV, separate changing rooms. Say it clearly; it brings in female members and their families.
9. **Timetable** — opening hours, batch timings, peak hours.
10. **Tools** — BMI / calorie calculator (cheap to build, people love it, good for Google).
11. **Reviews** — pulled from Google reviews + rating badge.
12. **Location** — Google Map, "Get directions", click-to-call, WhatsApp button.
13. **Floating WhatsApp button** on every screen. In India this is the #1 enquiry channel.

## Membership payment — yes, do it

- Use **Razorpay** (or Cashfree / PhonePe PG): UPI, cards, net banking, EMI on yearly plans.
- Flow: pick plan → name, phone, OTP → pay → instant WhatsApp/SMS receipt + GST invoice → member shows it at the desk.
- Later: **UPI Autopay** for monthly plans so renewals happen automatically.
- Renewal reminders on WhatsApp before expiry. This alone pays for the website.
- Client needs: GST number (if registered), bank account, KYC docs for Razorpay.

## Biometric integration — good idea, but phase 2

It's not a bad idea at all; it's the thing that makes this more than a brochure site. Most Indian gym biometric
machines (eSSL, ZKTeco, Realtime) can push attendance logs to a server (ADMS / push protocol / their SDK).

What it unlocks:
- **Auto access control** — membership expires → device stops letting them in. Pays → access restored instantly.
- **Member dashboard** — attendance calendar, streaks, "you came 18 days this month".
- **Owner dashboard** — live count in gym, daily footfall, peak hours, who hasn't come in 10 days (call them before they quit).
- **Live "how crowded is it now"** on the website — a genuinely cool feature.

Rules:
- Fingerprints / face data **never** leave the device. The site only gets "member X entered at 7:02 AM".
- Follow India's DPDP Act: consent at signup, privacy policy page.
- Need the exact device brand/model from the client first — that decides how we connect.

## Phases

**Phase 1 — the draft (show the client)**
Single page, all sections above with placeholder copy, real-looking visuals, plans UI, WhatsApp button. No backend.

**Phase 2 — go live**
Real photos/video shoot, Razorpay payments, OTP signup, WhatsApp receipts, admin panel to edit plans/prices, Google Business link, SEO for "gym in Kanpur".

**Phase 3 — the "crazy" part**
Biometric sync, member dashboard, auto renewals, live crowd meter, referral program ("bring a friend, get 15 days free").

## Questions for the client

1. Address, timings, and whether there are women-only hours or a female trainer.
2. Current plan prices and any offers.
3. Trainer names, photos, certifications.
4. Biometric device brand and model.
5. GST registered? Bank account for Razorpay?
6. Instagram handle, Google Maps listing, WhatsApp number.
7. Any member transformations we're allowed to show.
8. Facilities: AC, steam, lockers, parking, supplements counter, diet plans.
9. Logo and brand colours — or are we designing those too?

## Draft v4 — cinematic (2026-10-30)

History: v1 template look, v2 stereotype, v3 lacked the "award site" wow (no video, no opening). Earlier versions in `docs/v1`–`docs/v3`.

v4 keeps v3's sport-native pieces (plate colours, floor plan, records board, plans as plates) and adds the cinematic layer:
- **Opening:** 000→100 counter while quick cuts of training clips flash in a small window, which then opens into the full-screen hero video.
- **Hero:** looping video, giant name; on scroll the video shrinks into a framed card and the name splits apart.
- **Manifesto:** words light up as you read, with tiny looping clips inline in the sentence.
- **Reel:** pinned section — Lift / Sweat / Push / Repeat — each word swaps in its own full-screen clip.
- **Women's section** and **footer** play video; custom cursor with labels on desktop.

Videos: Mixkit free licence, one consistent shoot (dark industrial gym), re-encoded with ffmpeg to 1280px, no audio, ~11 MB total in `public/video/`.
Replace with a real shoot at the client's gym for launch (same clip names = no code change).

**Placeholders to replace with client data:** phone (`PHONE` in page.tsx), address, coach names, records, stories,
prices, hours, women-only hour, zone sizes, Instagram link, photos and videos.
The crowd meter uses a fixed hourly curve until the biometric device is connected. Payment is a mock until Razorpay.

## Logo refresh (2026-10-30)

Client's real name is **The Muscle Paradise**, tagline **"Date the weight"**. The existing logo is a lit amber kettlebell
sign with an MP monogram in a black disc and the name + tagline on the ring.

Redrawn as SVG in `app/Logo.tsx` (variants: `badge`, `mark`), favicon in `app/icon.svg`. Kept everything recognisable,
cleaned up: true geometry for the bell, single stroke weight on the monogram (M's right leg doubles as P's stem, original's
foot kept), Archivo ring type, amber glow gradient. Presentation page for the client at **/brand** (badge, light/dark,
mark, lockup, app icon, membership card, tee, palette). Site accent switched to brand amber `#F5A524`.

## Conversion layer (2026-10-30)

- **Plan quiz** (`app/Quiz.tsx`): goal, who, days, experience → projected range, weekly schedule, quietest hours
  (from crowd data), matched coach, recommended membership (couples −15%), WhatsApp booking prefilled with answers.
- **Hold to start** in the footer: press-and-hold ring opens the join sheet (commitment through a physical action).
- **No joining fee till month end** with a live countdown (real deadline — client must actually honour it).
- **Activity popups** ("Ankit from Kakadeo booked a free session"): DEMO list in `page.tsx`. Must be wired to real
  bookings before launch; fake activity is misleading and not allowed under Indian consumer dark-pattern rules.
- **Price anchoring**: yearly = "₹33 a day. Less than your chai and samosa."
- **Mobile sticky bar**: Get my plan / Free session.
- **/owner**: demo dashboard for the client (live floor count, revenue, renewals with WhatsApp reminders,
  members who might quit, website leads). Not linked from the public site; noindex.

## Real contact details (2026-10-30)

Phone / WhatsApp: +91 95808 24464. Address: 1420/37A, The Muscle Paradise, Khadepur Chauraha, near Kameshwar Mandir,
Hanumant Vihar, Naubasta, Kanpur, UP 208021. Set in `PHONE` / `ADDRESS` / `MAPS` at the top of `app/page.tsx`.

## v5 — real gym, premium, no gradients (2026-10-30)

Client feedback: two floors (iron + cardio), men and women train together (no separate batch), members compete on
stage, start of the page should be better, gradients look cheap. Changes:
- Opening: the kettlebell sign "switches on" (flicker like a lit sign at night) over a counter, then wipes up into the hero.
- Hero: big name + real member photo slideshow (4 photos), facts row, Get my plan / Book a free session.
- **Two floors** section replaces the zone plan: Ground floor = Iron, 1st floor = Cardio (confirm with client).
- **Stage** section: "Some come to get fit. Some come to compete." + contest prep; Contest prep added to programs.
- Unisex section rewritten: same floor, no separate timings; women-only hour removed everywhere.
- Records board removed (made-up numbers). Find-us block with storefront photo, address, hours, Instagram.
- All gradients and glows removed (logo is flat amber now). Sharp corners, thin rules, flat colours.

**Photo slots** (`public/photos/`, currently stock stand-ins — overwrite with the client's photos, same names):
| file | which photo |
| --- | --- |
| backstage.jpg | bearded competitor backstage, hands on waist |
| pose-back.jpg | back double-biceps pose against black wall |
| abs.jpg | member lifting shirt by the machine |
| squad.jpg | four members posing in the mirror |
| selfie.jpg | mirror selfie with backpack |
| storefront.jpg | the building front with the sign |
| floor-iron.jpg | machines room with the bodybuilder mural |
| floor-cardio.jpg | big floor with treadmills by the glass |

## v6 — video hero back + kettlebell opening (2026-10-30)

Client wanted the full-screen video hero back and a crazier opening. Now: counter 000→100 while quick cuts
(stock clip frames + member photos) flash inside a **window shaped like his kettlebell logo** with an amber outline;
at 100 the kettlebell rushes at the camera until the video fills the screen; then the name rises in. On scroll the video
shrinks into a card and the name splits ("Date the weight." appears). Mask shape: `public/brand/kettlebell-mask.svg`,
size driven by `--m` on `.hero`. Everything from v5 (floors, stage, quiz, no gradients) kept. v5 archived in `docs/v5/`.

Fix (2026-10-30): kettlebell opening now uses an inline SVG mask "curtain" (same shape everywhere, no CSS mask-size
quirks). Floors corrected: **ground floor = cardio, 1st floor = weights/all machines**.

## v7 — cinematic & minimal body (2026-10-30)

Client liked the opening but not the rest. Everything after the hero is now 5 full-screen **stacking cards** (sticky; the
previous card sinks and darkens as the next slides over): Cardio (ground floor), Weights (1st floor), Stage, Together,
Coached — each one video/photo, one giant word, one line, at most one button. Then the plan quiz, the plate memberships,
and a full-screen "Come lift." ending over the gym photo (`photos/storefront.jpg`) with address, hold-to-join, WhatsApp,
directions. Removed: manifesto, reel, programs list, coach grid, stories, live crowd chart (still on /owner).
Card content lives in the `cards` array at the top of `app/page.tsx`. v6 archived in `docs/v6/`.

## v8 — first draft design + videos + kettlebell opening (2026-10-30)

Client asked to go back to the first draft (v1) look — dark, condensed caps, mono labels, grayscale media, ticker,
pinned horizontal floor tour, numbered sections — but with video and with the current opening kept.
- Opening + video hero: unchanged from v6/v7 (kettlebell curtain, counter, zoom, name split on scroll).
- Accent is the logo amber instead of v1's red (change `--sindoor` in globals.css to switch back).
- Videos: manifesto pills, floor tour panels, program hover previews, unisex section, footer background.
- Real info kept: two floors (ground = cardio, 1st = weights), unisex together, stage/contest prep, contact details,
  quiz, joining-fee offer, mobile bar, join sheet. /brand and /owner unchanged. v7 archived in docs/v7.
