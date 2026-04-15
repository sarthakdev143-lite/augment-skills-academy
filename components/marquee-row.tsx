"use client";

import { ArrowRight } from "lucide-react";

type PlacementCard = {
  name:    string;
  from:    string;
  to:      string;
  company: string;
};

type MarqueeRowProps = {
  cards:    PlacementCard[];
  reverse?: boolean;
};

const avatarColors = ["#e36a2f", "#0f7f78", "#132238", "#8b5cf6", "#f59e0b", "#06b6d4"] as const;

export function MarqueeRow({ cards, reverse = false }: MarqueeRowProps) {
  const doubled = [...cards, ...cards];

  return (
    <div className="overflow-hidden" aria-hidden>
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((card, i) => (
          <div
            key={i}
            className="mx-2 flex w-64 flex-shrink-0 items-center gap-3 rounded-2xl border border-border/80 bg-surface px-4 py-4 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-200"
          >
            {/* Avatar */}
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white shadow-sm"
              style={{ background: avatarColors[i % avatarColors.length] }}
            >
              {card.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-foreground">{card.name}</p>
              <div className="flex items-center gap-1 text-[11px] mt-0.5">
                <span className="truncate text-muted max-w-[70px]">{card.from}</span>
                <ArrowRight size={9} className="flex-shrink-0 text-accent" />
                <span className="truncate font-bold text-foreground max-w-[80px]">{card.to}</span>
              </div>
              <p className="mt-1 text-[10px] font-black text-accent/80">{card.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}