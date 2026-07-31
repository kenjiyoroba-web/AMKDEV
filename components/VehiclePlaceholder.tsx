import { Car } from "lucide-react";

export function VehiclePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_60%)] bg-surface-2 ${className}`}
    >
      <Car className="h-12 w-12 text-muted/40" strokeWidth={1.25} />
    </div>
  );
}
