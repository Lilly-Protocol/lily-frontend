import type { ComponentPropsWithoutRef } from "react";

const skeletonVariants = {
  block: "h-4 w-full rounded-[0.875rem]",
  text: "h-3 w-full rounded-full",
  avatar: "h-10 w-10 rounded-full",
  card: "min-h-32 w-full rounded-[1.5rem]",
} as const;

const avatarSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
} as const;

type SkeletonVariant = keyof typeof skeletonVariants;
type SkeletonAvatarSize = keyof typeof avatarSizes;

export type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
  variant?: SkeletonVariant;
  animated?: boolean;
};

export type SkeletonTextProps = ComponentPropsWithoutRef<"div"> & {
  lines?: number;
  widths?: readonly string[];
  lineClassName?: string;
  animated?: boolean;
};

export type SkeletonAvatarProps = Omit<SkeletonProps, "variant"> & {
  size?: SkeletonAvatarSize;
};

export type SkeletonCardProps = ComponentPropsWithoutRef<"div"> & {
  rows?: number;
  showAvatar?: boolean;
  animated?: boolean;
};

export function Skeleton({
  className,
  variant = "block",
  animated = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden={props["aria-hidden"] ?? true}
      className={cx(
        "bg-[var(--color-panel-muted)]",
        "motion-reduce:animate-none",
        animated && "motion-safe:animate-pulse",
        skeletonVariants[variant],
        className,
      )}
    />
  );
}

export function SkeletonText({
  className,
  lines = 3,
  widths = ["100%", "92%", "76%"],
  lineClassName,
  animated = true,
  ...props
}: SkeletonTextProps) {
  return (
    <div
      {...props}
      aria-label={props["aria-label"] ?? "Loading text"}
      role={props.role ?? "status"}
      className={cx("space-y-2", className)}
    >
      {Array.from({ length: Math.max(1, lines) }, (_, index) => (
        <Skeleton
          key={index}
          animated={animated}
          className={cx(lineClassName)}
          style={{ width: widths[index % widths.length] }}
          variant="text"
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({
  className,
  size = "md",
  animated = true,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      {...props}
      animated={animated}
      className={cx(avatarSizes[size], className)}
      variant="avatar"
    />
  );
}

export function SkeletonCard({
  className,
  rows = 3,
  showAvatar = true,
  animated = true,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      {...props}
      aria-label={props["aria-label"] ?? "Loading card"}
      role={props.role ?? "status"}
      className={cx(
        "rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-panel)] p-5 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {showAvatar && <SkeletonAvatar animated={animated} size="lg" />}
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton animated={animated} className="max-w-48" />
          <SkeletonText
            animated={animated}
            aria-label="Loading card details"
            lines={rows}
          />
        </div>
      </div>
    </div>
  );
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
