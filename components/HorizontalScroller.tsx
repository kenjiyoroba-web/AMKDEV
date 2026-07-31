import { type ReactNode } from "react";

export function HorizontalScroller({ children }: { children: ReactNode }) {
  return (
    <div className="flex snap-x snap-mandatory gap-px overflow-x-auto border border-border bg-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}
