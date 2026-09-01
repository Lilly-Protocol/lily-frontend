import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "avatar" | "card";
}

export function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const base = "bg-[var(--color-line)] motion-reduce:animate-none animate-pulse rounded";

  const variants = {
    default: "",
    text: "h-4 w-full",
    avatar: "h-10 w-10 rounded-full",
    card: "h-32 w-full rounded-lg",
  };

  return (
    <div
      className={cn(base, variants[variant], className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className,
  ...props
}: { lines?: number } & Omit<SkeletonProps, "variant">) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? "w-3/4" : undefined}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({
  className,
  ...props
}: Omit<SkeletonProps, "variant">) {
  return (
    <div className={cn("space-y-3 p-4", className)} {...props}>
      <div className="flex items-center space-x-3">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-4/5" />
    </div>
  );
}
