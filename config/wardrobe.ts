// Edit this file to update content — no coding knowledge needed.
// Add or remove clothing items for the "Style the Mannequin" game.
// Each item needs: id, label, src (image path in /public/wardrobe/), and zone.
// Zones: "top", "bottom", "shoes", "accessory"
// The mannequin image is at /public/mannequin.png

export type ClothingZone = "top" | "bottom" | "shoes" | "accessory";

export interface ClothingItem {
  id: string;
  label: string;
  src: string;
  zone: ClothingZone;
}

export const mannequinSrc = "/mannequin.png";

export const wardrobeItems: ClothingItem[] = [
  { id: "top-1", label: "Chemise à Cravate", src: "/wardrobe/shirt.png", zone: "top" },
  { id: "top-2", label: "Top Blanc", src: "/wardrobe/top-blanc.png", zone: "top" },
  { id: "bottom-1", label: "Robe Jacquemus", src: "/wardrobe/dress.png", zone: "bottom" },
  { id: "bottom-2", label: "Wide-Leg Jeans", src: "/wardrobe/jeans.png", zone: "bottom" },
  { id: "bottom-3", label: "Robe Adidas", src: "/wardrobe/skirt.png", zone: "bottom" },
  { id: "bottom-4", label: "Robe à Rayures", src: "/wardrobe/robe-rayure.png", zone: "bottom" },
];

export const trendLabels = [
  "Très chic ✦",
  "Trend-forward ✦",
  "Fashion visionary ✦",
  "Runway-ready ✦",
  "Effortlessly iconic ✦",
];
