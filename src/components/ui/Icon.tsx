import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icons = {
  arrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  arrowUpRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M7 17 17 7M9 7h8v8" />
    </Base>
  ),
  check: (p: IconProps) => (
    <Base {...p}>
      <path d="m4 12.5 5 5L20 6.5" />
    </Base>
  ),
  chevronDown: (p: IconProps) => (
    <Base {...p}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  ),
  sparkles: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
    </Base>
  ),
  bolt: (p: IconProps) => (
    <Base {...p}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Base>
  ),
  shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-.8 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  ),
  cpu: (p: IconProps) => (
    <Base {...p}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3" />
    </Base>
  ),
  activity: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </Base>
  ),
  wallet: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 8a2 2 0 0 1 2-2h12v3" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <circle cx="16.5" cy="13" r="1.2" />
    </Base>
  ),
  lock: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </Base>
  ),
  mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Base>
  ),
  ledger: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 3h11a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M9 8h7M9 12h7M9 16h4M4 7h2M4 12h2M4 17h2" />
    </Base>
  ),
  target: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Base>
  ),
  headset: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.6" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.6" />
      <path d="M19.5 19v.5a3 3 0 0 1-3 3H13" />
    </Base>
  ),
  chart: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 16v-4M12 16V7M16 16v-6" />
    </Base>
  ),
  pen: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 20h4L20 8l-4-4L4 16v4Z" />
      <path d="m14.5 5.5 4 4" />
    </Base>
  ),
  users: (p: IconProps) => (
    <Base {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3.2 3.2 0 0 1 0 6M17 14.5a6 6 0 0 1 4 5.5" />
    </Base>
  ),
  megaphone: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 10v4a2 2 0 0 0 2 2h1l9 4V4L7 8H6a2 2 0 0 0-2 2Z" />
      <path d="M19 9a3 3 0 0 1 0 6" />
    </Base>
  ),
  scale: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 4v16M7 20h10M4 8h16M4 8l-2 6h4l-2-6ZM20 8l-2 6h4l-2-6Z" />
    </Base>
  ),
  boxes: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="12" width="8" height="8" rx="1.5" />
      <rect x="13" y="12" width="8" height="8" rx="1.5" />
      <rect x="8" y="3" width="8" height="8" rx="1.5" />
    </Base>
  ),
  search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Base>
  ),
  globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" />
    </Base>
  ),
  star: (p: IconProps) => (
    <Base {...p} fill="currentColor" strokeWidth={0}>
      <path d="m12 3.6 2.5 5.2 5.6.8-4 4 .9 5.7-5-2.7-5 2.7.9-5.7-4-4 5.6-.8L12 3.6Z" />
    </Base>
  ),
  clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  play: (p: IconProps) => (
    <Base {...p}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </Base>
  ),
  menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  close: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6 18 18M18 6 6 18" />
    </Base>
  ),
  sun: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </Base>
  ),
  moon: (p: IconProps) => (
    <Base {...p}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </Base>
  ),
  languages: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 6h9M7.5 4v2c0 3.5-2 6.5-4.5 8" />
      <path d="M6 11c1.5 2.5 3.5 4 6 5M13 20l4-9 4 9M14.6 17h4.8" />
    </Base>
  ),
  bitcoin: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 8h4a2 2 0 0 1 0 4h-4Zm0 4h4.5a2 2 0 0 1 0 4H9.5Zm0-4V6.5m0 11V16m2.5-9.5V6.5m0 11V16" />
    </Base>
  ),
  creditCard: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M6.5 15h3" />
    </Base>
  ),
  layers: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </Base>
  ),
  plug: (p: IconProps) => (
    <Base {...p}>
      <path d="M9 3v6M15 3v6" />
      <path d="M6 9h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V9ZM12 18v3" />
    </Base>
  ),
  route: (p: IconProps) => (
    <Base {...p}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h.5" />
    </Base>
  ),
  eye: (p: IconProps) => (
    <Base {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  ),
  database: (p: IconProps) => (
    <Base {...p}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </Base>
  ),
  quote: (p: IconProps) => (
    <Base {...p} strokeWidth={0} fill="currentColor">
      <path d="M9.5 6C6.5 7.4 5 9.9 5 13.5V18h5.5v-5.5H8c0-2 .6-3.4 2.4-4.4L9.5 6Zm9 0c-3 1.4-4.5 3.9-4.5 7.5V18H19.5v-5.5H17c0-2 .6-3.4 2.4-4.4L18.5 6Z" />
    </Base>
  ),
} as const;

export type IconName = keyof typeof Icons;
