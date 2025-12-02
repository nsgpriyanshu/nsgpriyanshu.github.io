import { cn } from '@/lib/utils'

function Skeleton({
  className,
  shimmer = true,
  ...props
}: React.ComponentProps<'div'> & { shimmer?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'rounded-md',
        shimmer
          ? 'from-muted via-muted/50 to-muted animate-shimmer bg-gradient-to-r'
          : 'bg-accent animate-pulse',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
