import { cn } from "@/lib/cn";

export function Eyebrow({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return <p className={cn("eyebrow", dark && "text-accent-2", className)}>{children}</p>;
}
