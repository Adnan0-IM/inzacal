import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
export function AnimatedGridPatternDemo({children}: {children?: React.ReactNode}) {
  return (
    <div className="bg-background relative flex h-[750px] w-full items-center justify-center overflow-hidden rounded-lg  p-20">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
        {children}
    </div>
  )
}
