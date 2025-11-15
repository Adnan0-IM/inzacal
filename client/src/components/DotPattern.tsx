"use client"
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"
export function DotPatternDemo({children}: {children?: React.ReactNode}) {
  return (
    <div className="bg-background relative flex h-[750px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(999px_circle_at_center,white,transparent)]"
        )}
      />
      {children}
    </div>
  )
}
