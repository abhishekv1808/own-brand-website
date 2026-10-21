import { cn } from "@/lib/cn";

/** ITBIZone mark: four zones on a grid, one lit. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-5", className)} aria-hidden>
      <rect x="4" y="4" width="11" height="11" rx="3.5" fill="currentColor" />
      <rect x="17" y="4" width="11" height="11" rx="5.5" fill="#9B8CFF" />
      <rect x="4" y="17" width="11" height="11" rx="5.5" fill="currentColor" opacity=".45" />
      <rect x="17" y="17" width="11" height="11" rx="3.5" fill="currentColor" />
    </svg>
  );
}
