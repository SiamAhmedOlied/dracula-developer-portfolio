
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-dracula-currentLine/70", className)}
      {...props}
    />
  )
}

export { Skeleton }
