import { cn } from '@/utils/cn';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[28px] border border-white/50 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5',
        className
      )}
    >
      <div className="h-full w-full animate-pulse rounded-[20px] bg-[linear-gradient(90deg,rgba(183,227,246,0.3),rgba(255,255,255,0.7),rgba(183,227,246,0.3))] bg-[length:200%_100%]" />
    </div>
  );
}
