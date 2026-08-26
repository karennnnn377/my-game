import type { CatId } from "./people";

export interface CatMeta {
  id: CatId;
  icon: string;
  c1: string; // primary hex
  c2: string; // secondary hex
}

export const CATS: CatMeta[] = [
  { id: "football", icon: "⚽", c1: "#22e584", c2: "#0b7a4b" },
  { id: "actors", icon: "🎬", c1: "#ffb400", c2: "#a35b00" },
  { id: "actresses", icon: "🎭", c1: "#ff6b9d", c2: "#96234f" },
  { id: "singers", icon: "🎵", c1: "#3fe3d6", c2: "#0b6e68" },
  { id: "musicians", icon: "🎸", c1: "#ff8a5c", c2: "#93401c" },
  { id: "rappers", icon: "🎤", c1: "#c084fc", c2: "#5b21a8" },
  { id: "basketball", icon: "🏀", c1: "#ff7a45", c2: "#8f3310" },
  { id: "tennis", icon: "🎾", c1: "#c8f542", c2: "#5c7a0c" },
  { id: "racing", icon: "🏎️", c1: "#ff3b56", c2: "#7e1023" },
  { id: "boxing", icon: "🥊", c1: "#f43f5e", c2: "#801330" },
  { id: "athletes", icon: "🏆", c1: "#ffd97a", c2: "#916b0f" },
  { id: "scientists", icon: "🧠", c1: "#60a5fa", c2: "#1d4ed8" },
  { id: "astronauts", icon: "🚀", c1: "#818cf8", c2: "#312e81" },
  { id: "historical", icon: "👑", c1: "#f59e0b", c2: "#7c4a03" },
  { id: "leaders", icon: "🌍", c1: "#38bdf8", c2: "#0c4a6e" },
  { id: "artists", icon: "🎨", c1: "#fb7185", c2: "#881337" },
  { id: "writers", icon: "📚", c1: "#a3e635", c2: "#3f6212" },
  { id: "entrepreneurs", icon: "💼", c1: "#fbbf24", c2: "#78350f" },
  { id: "tech", icon: "💻", c1: "#2dd4bf", c2: "#115e59" },
  { id: "gaming", icon: "🎮", c1: "#a78bfa", c2: "#4c1d95" },
  { id: "tv", icon: "📺", c1: "#f472b6", c2: "#831843" },
  { id: "comedians", icon: "😂", c1: "#facc15", c2: "#854d0e" },
  { id: "internet", icon: "📱", c1: "#4ade80", c2: "#14532d" },
  { id: "iran", icon: "🇮🇷", c1: "#4dffa8", c2: "#065f46" },
  { id: "world", icon: "🌎", c1: "#38bdf8", c2: "#075985" },
];

export const CAT_MAP: Record<CatId, CatMeta> = CATS.reduce(
  (a, c) => ((a[c.id] = c), a),
  {} as Record<CatId, CatMeta>
);

/* Plausible distractor pools: sibling categories by theme */
export const SIBLINGS: Record<CatId, CatId[]> = {
  football: ["football"],
  actors: ["actors", "actresses", "comedians"],
  actresses: ["actresses", "actors", "comedians"],
  singers: ["singers", "musicians", "rappers"],
  musicians: ["musicians", "singers", "rappers"],
  rappers: ["rappers", "singers", "musicians"],
  basketball: ["basketball", "athletes", "football"],
  tennis: ["tennis", "athletes"],
  racing: ["racing", "athletes"],
  boxing: ["boxing", "athletes"],
  athletes: ["athletes", "boxing", "football", "basketball", "tennis", "racing"],
  scientists: ["scientists", "astronauts", "tech"],
  astronauts: ["astronauts", "scientists"],
  historical: ["historical", "leaders", "world", "writers"],
  leaders: ["leaders", "historical", "world"],
  artists: ["artists", "writers"],
  writers: ["writers", "artists", "historical"],
  entrepreneurs: ["entrepreneurs", "tech", "leaders"],
  tech: ["tech", "entrepreneurs", "scientists"],
  gaming: ["gaming", "internet", "tv"],
  tv: ["tv", "comedians", "internet", "gaming"],
  comedians: ["comedians", "actors", "tv"],
  internet: ["internet", "gaming", "tv"],
  iran: ["iran"],
  world: ["world", "historical", "leaders"],
};
