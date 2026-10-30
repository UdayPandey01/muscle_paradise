import { useId } from "react";

// The Muscle Paradise kettlebell badge, redrawn from the client's sign.
// badge = full logo with ring text, mark = kettlebell + monogram only.
export default function Logo({
  variant = "badge",
  className,
}: {
  variant?: "badge" | "mark";
  className?: string;
}) {
  const id = useId();
  const badge = variant === "badge";
  const disc = badge ? 60 : 74;

  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      role="img"
      aria-label="The Muscle Paradise"
    >
      <defs>
        <path id={`${id}top`} d="M41.2 199.9 A80 80 0 1 1 198.8 199.9" />
        <path id={`${id}bottom`} d="M29 186 A91 91 0 0 0 211 186" />
      </defs>

      {/* handle (with its hole) then the bell on top */}
      <path
        fill="#f5a524"
        fillRule="evenodd"
        d="M28 140 V78 C28 38 56 14 96 14 H144 C184 14 212 38 212 78 V140 Z M66 120 V84 C66 60 80 48 104 48 H136 C160 48 174 60 174 84 V120 Z"
      />
      <circle cx="120" cy="186" r="108" fill="#f5a524" />

      {badge && (
        <g
          fill="#2a1608"
          fontFamily="var(--font-archivo), sans-serif"
          fontWeight="700"
          fontSize="14"
          letterSpacing="2.6"
          style={{ fontStretch: "112%" }}
        >
          <text textAnchor="middle">
            <textPath href={`#${id}top`} startOffset="50%">
              THE MUSCLE PARADISE
            </textPath>
          </text>
          <text textAnchor="middle">
            <textPath href={`#${id}bottom`} startOffset="50%">
              DATE THE WEIGHT
            </textPath>
          </text>
          <circle cx="39.7" cy="215.2" r="2.4" />
          <circle cx="200.3" cy="215.2" r="2.4" />
        </g>
      )}

      <circle cx="120" cy="186" r={disc} fill="#0e0e0e" />
      <circle
        cx="120"
        cy="186"
        r={disc - 5}
        fill="none"
        stroke="#f5a524"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* MP monogram: the M's right leg is the P's stem, with the original's foot on the left */}
      <path
        transform={`translate(${120 - 40 * (disc / 60)} ${186 - 29 * (disc / 60)}) scale(${disc / 60})`}
        fill="none"
        stroke="#f4f1ea"
        strokeWidth="5.5"
        strokeLinejoin="miter"
        strokeLinecap="square"
        d="M0 55 H12 V6 L32 36 L52 6 V55 M52 6 H67 A12.5 12.5 0 0 1 67 31 H52"
      />
    </svg>
  );
}
