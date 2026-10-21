import { cn } from "@/lib/cn";
import { ArrowRight } from "./Icons";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "dark" | "outline-light";

type ButtonProps = {
  href: string;
  children: string;
  variant?: Variant;
  icon?: boolean;
  magnetic?: boolean;
  external?: boolean;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-cta hover:bg-accent-deep",
  secondary: "border border-line bg-white text-ink hover:border-ink/25",
  dark: "bg-ink text-white shadow-cta hover:bg-black",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};

const iconStyles: Record<Variant, string> = {
  primary: "bg-white/15",
  secondary: "bg-surface",
  dark: "bg-white/10",
  "outline-light": "bg-white/10",
};

/** Pill CTA: arrow slides right and the label rolls vertically on hover. */
export function Button({ href, children, variant = "primary", icon = true, magnetic, external, className }: ButtonProps) {
  const link = (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-[52px] items-center gap-3 rounded-pill pl-6 text-[15px] font-medium whitespace-nowrap transition-colors duration-300",
        icon ? "pr-1.5" : "pr-6",
        styles[variant],
        className,
      )}
    >
      <span className="relative block h-[1.25em] overflow-hidden leading-[1.25]">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      {icon && (
        <span className={cn("grid size-10 place-items-center overflow-hidden rounded-full", iconStyles[variant])}>
          <span className="flex w-[52px] -translate-x-[26px] items-center justify-around transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
            <ArrowRight size={17} />
            <ArrowRight size={17} />
          </span>
        </span>
      )}
    </a>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
