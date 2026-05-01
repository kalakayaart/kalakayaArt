export const NAV_LINKS = [
  { label: "Art", href: "/art" },
  { label: "Artists", href: "/artist" },
  {
    label: "Events",
    href: "../components/work",
    dropdown: [
      { label: "Current Exhibitions", href: "./work" },
      { label: "Upcoming Exhibitions", href: "./work" },
      { label: "Event Calendar", href: "./work" },
    ],
  },
  {
    label: "Education",
    href: "./work",
    dropdown: [
      { label: "Articles", href: "./work" },
      { label: "Cataloguse", href: "./work" },
      { label: "Interpretive Videos", href: "./work" },
      { label: "Talk and Podcasts", href: "./work" },
      { label: "Archives", href: "./work" },
    ],
  },
  { label: "Residency", href: "./residency" },
  { label: "Store", href: "./work", external: true },
];