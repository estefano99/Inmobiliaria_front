import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center cursor-default select-none capitalize rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // destructive:
        //   "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        finalizado:
          "border-transparent bg-primary text-primary-foreground",
        // outline: "text-foreground",
        rescindido: "border-transparent bg-destructive text-destructive-foreground",
        vigente:
          "border-transparent bg-green-700 text-white",
        proximo_a_vencer:
          "border-transparent bg-yellow-500 text-yellow-950",
        info:
          "border-transparent bg-blue-700 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }