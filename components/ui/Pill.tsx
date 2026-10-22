import { cn } from "@/lib/cn";

type PillProps = {
  children: React.ReactNode;
  pulse?: boolean;
  tone?: "light" | "dark" | "accent";
  className?: string;
};

export function Pill({ children, pulse, tone = "light", className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.005em]",
        tone === "light" && "border border-line bg-white text-ink shadow-soft",
        tone === "dark" && "border border-night-line bg-white/5 text-white",
        tone === "accent" && "bg-accent-tint text-accent-deep",
        className,
      )}
    >
      {pulse && <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />}
      {children}
    </span>
  );
}
