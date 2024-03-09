import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface HintProps {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: "left" | "right" | "top" | "bottom"
  align?: "start" | "center" | "end"
  delayDuration?: number
}

export default function Hint({
  label,
  children,
  asChild = false,
  side,
  align,
  delayDuration = 300
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="text-primary-foreground bg-primary"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}