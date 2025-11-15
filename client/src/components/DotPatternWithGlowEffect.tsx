
import { cn } from "@/lib/utils"
import { DotPattern } from "./ui/dot-pattern"

export function DotPatternWithGlowEffect({children}: {children?: React.ReactNode}) {
  return (
    <div className="relative  bg-green-900 flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,blue,transparent)]"
        )}
      />
      {children}
    </div>
  )
}
