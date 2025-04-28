import { cn } from "@/lib/utils"

/**
 * Renders a skeleton placeholder component, often used to indicate loading states.
 *
 * @param {React.ComponentProps<"div">} props - The standard HTML div attributes.
 * @param {string} [props.className] - Additional class names to apply to the skeleton element.
 * @returns {JSX.Element} The rendered skeleton component.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
