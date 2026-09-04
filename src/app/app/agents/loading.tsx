import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function AgentsLoading() {
  return (
    <main
      aria-busy="true"
      className="surface rounded-[1.75rem] p-8 sm:p-10"
    >
      <p className="sr-only" role="status">
        Loading agents
      </p>
      <Skeleton className="h-8 w-64" />
      <div className="mt-8 grid gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
  );
}
