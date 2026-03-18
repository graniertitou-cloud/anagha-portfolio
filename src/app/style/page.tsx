"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { wardrobeItems, trendLabels, ClothingZone } from "../../../config/wardrobe";
import type { ClothingItem } from "../../../config/wardrobe";
import PageHeader from "../../components/PageHeader";
import FadeIn from "../../components/FadeIn";
import TrackableButton from "../../components/TrackableButton";

const zonePositions: Record<ClothingZone, { top: string; label: string }> = {
  top: { top: "10%", label: "Top" },
  bottom: { top: "40%", label: "Bottom" },
  shoes: { top: "70%", label: "Shoes" },
  accessory: { top: "5%", label: "Accessory" },
};

function DraggableItem({ item }: { item: ClothingItem }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: item,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing bg-neutral-50 border border-neutral-100 rounded-sm p-3 text-center transition-all hover:border-[#E8A0A0] hover:shadow-sm ${isDragging ? "opacity-30" : ""}`}
    >
      <div className="w-16 h-16 mx-auto mb-2 bg-neutral-100 rounded-sm flex items-center justify-center text-2xl">
        {item.zone === "top" && "👕"}
        {item.zone === "bottom" && "👖"}
        {item.zone === "shoes" && "👠"}
        {item.zone === "accessory" && "👜"}
      </div>
      <span className="text-xs font-sans text-neutral-500">{item.label}</span>
    </div>
  );
}

function DropZone({
  zone,
  placedItem,
}: {
  zone: ClothingZone;
  placedItem: ClothingItem | null;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `zone-${zone}`,
    data: { zone },
  });

  const pos = zonePositions[zone];

  return (
    <div
      ref={setNodeRef}
      className={`absolute left-1/2 -translate-x-1/2 w-28 h-20 border-2 border-dashed rounded-sm flex items-center justify-center transition-all ${
        isOver
          ? "border-[#E8A0A0] bg-[#E8A0A0]/10"
          : placedItem
            ? "border-[#E8A0A0]/50 bg-[#E8A0A0]/5"
            : "border-neutral-200"
      }`}
      style={{ top: pos.top }}
    >
      {placedItem ? (
        <div className="text-center">
          <span className="text-2xl">
            {placedItem.zone === "top" && "👕"}
            {placedItem.zone === "bottom" && "👖"}
            {placedItem.zone === "shoes" && "👠"}
            {placedItem.zone === "accessory" && "👜"}
          </span>
          <p className="text-[10px] font-sans text-neutral-500 mt-1">
            {placedItem.label}
          </p>
        </div>
      ) : (
        <span className="text-[10px] font-sans text-neutral-300 uppercase tracking-wider">
          {pos.label}
        </span>
      )}
    </div>
  );
}

export default function StylePage() {
  const [placed, setPlaced] = useState<Record<ClothingZone, ClothingItem | null>>({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
  });
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(null);
  const [score, setScore] = useState<{ value: string; label: string } | null>(null);
  const [showScore, setShowScore] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const placedCount = Object.values(placed).filter(Boolean).length;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItem(event.active.data.current as ClothingItem);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;
    if (!over) return;

    const item = active.data.current as ClothingItem;
    const zoneId = over.id as string;
    const zone = zoneId.replace("zone-", "") as ClothingZone;

    if (item.zone === zone) {
      setPlaced((prev) => ({ ...prev, [zone]: item }));
    }
  }, []);

  const handleGetScore = () => {
    const value = (8 + Math.random() * 2).toFixed(1);
    const label = trendLabels[Math.floor(Math.random() * trendLabels.length)];
    setScore({ value, label });
    setShowScore(true);
  };

  const handleReset = () => {
    setPlaced({ top: null, bottom: null, shoes: null, accessory: null });
    setScore(null);
    setShowScore(false);
  };

  // Items not yet placed
  const available = wardrobeItems.filter(
    (item) => !placed[item.zone] || placed[item.zone]?.id !== item.id
  );

  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader title="Style the Mannequin" />

      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <p className="font-sans text-neutral-500 mb-10 max-w-xl">
            Drag clothing items onto the mannequin to build your outfit.
            Place at least 2 items, then get your trend score.
          </p>
        </FadeIn>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid md:grid-cols-[1fr_280px_1fr] gap-8 items-start">
            {/* Wardrobe panel */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {available.map((item) => (
                  <DraggableItem key={item.id} item={item} />
                ))}
              </div>
            </FadeIn>

            {/* Mannequin */}
            <FadeIn delay={0.2}>
              <div className="relative bg-neutral-50 border border-neutral-100 rounded-sm mx-auto" style={{ width: 240, height: 480 }}>
                {/* Simple mannequin SVG silhouette */}
                <svg
                  viewBox="0 0 120 240"
                  className="absolute inset-0 w-full h-full opacity-10"
                  fill="currentColor"
                >
                  {/* Head */}
                  <circle cx="60" cy="30" r="15" />
                  {/* Neck */}
                  <rect x="55" y="45" width="10" height="10" />
                  {/* Torso */}
                  <path d="M35 55 L85 55 L80 130 L40 130 Z" />
                  {/* Arms */}
                  <path d="M35 55 L15 110 L20 112 L40 65 Z" />
                  <path d="M85 55 L105 110 L100 112 L80 65 Z" />
                  {/* Legs */}
                  <path d="M40 130 L35 220 L50 220 L55 140 Z" />
                  <path d="M80 130 L85 220 L70 220 L65 140 Z" />
                </svg>

                {/* Drop zones */}
                <DropZone zone="accessory" placedItem={placed.accessory} />
                <DropZone zone="top" placedItem={placed.top} />
                <DropZone zone="bottom" placedItem={placed.bottom} />
                <DropZone zone="shoes" placedItem={placed.shoes} />
              </div>
            </FadeIn>

            {/* Score / actions panel */}
            <FadeIn delay={0.3}>
              <div className="space-y-6">
                <AnimatePresence>
                  {showScore && score && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center p-8 bg-neutral-50 border border-neutral-100 rounded-sm"
                    >
                      <p className="text-6xl font-serif font-bold text-[#E8A0A0] mb-2">
                        {score.value}
                      </p>
                      <p className="font-sans text-sm text-neutral-500 tracking-wider">
                        {score.label}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {placedCount >= 2 && !showScore && (
                  <FadeIn>
                    <TrackableButton
                      label="Get Trend Score"
                      onClick={handleGetScore}
                      className="w-full text-center"
                    >
                      Get My Trend Score
                    </TrackableButton>
                  </FadeIn>
                )}

                {placedCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="w-full text-center text-xs font-sans text-neutral-400 hover:text-black transition-colors py-2"
                  >
                    Reset
                  </button>
                )}

                <div className="text-xs font-sans text-neutral-300 text-center">
                  {placedCount}/4 items placed
                </div>
              </div>
            </FadeIn>
          </div>

          <DragOverlay>
            {activeItem && (
              <div className="bg-white border border-[#E8A0A0] rounded-sm p-3 text-center shadow-lg opacity-90">
                <div className="w-16 h-16 mx-auto mb-2 bg-neutral-100 rounded-sm flex items-center justify-center text-2xl">
                  {activeItem.zone === "top" && "👕"}
                  {activeItem.zone === "bottom" && "👖"}
                  {activeItem.zone === "shoes" && "👠"}
                  {activeItem.zone === "accessory" && "👜"}
                </div>
                <span className="text-xs font-sans text-neutral-500">
                  {activeItem.label}
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
}
