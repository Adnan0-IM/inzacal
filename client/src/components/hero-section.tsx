import { ArrowRight, Bell, LineChart, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";
import { Image } from "@unpic/react";
import { Link } from "react-router";
import nightBackground from "@/assets/night-background.jpg";
import Stats from "@/components/stats";
import type { Variants } from "motion/react";

const stats = [
  { value: "10K+", label: "Active Businesses", icon: Users },
  { value: "50M+", label: "Transactions Tracked", icon: LineChart },
  { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
  { value: "24/7", label: "Customer Support", icon: Bell },
];

// Typed so "spring" stays a literal, not widened to string
const transitionVariants: { item: Variants } = {
  item: {
    hidden: {
      opacity: 0,
      y: 12,
      // filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

// For the block where you passed both container + item
const heroGroupVariants: { container: Variants; item: Variants } = {
  container: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 2,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative py-24 md:py-36">
            <AnimatedGroup
              variants={heroGroupVariants}
              className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
            >
              <Image
                src={nightBackground}
                alt="background"
                className="size-full block"
                width={3276}
                height={4095}
              />
            </AnimatedGroup>

            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to="#features"
                    className="hover:bg-background dark:hover:border-t-border bg-amber-50 dark:bg-amber-600/10 group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Smarter Business Management
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <div className="mx-auto mt-8 max-w-4xl text-center lg:mt-16">
                  <TextEffect
                    preset="slide"
                    speedSegment={0.3}
                    delay={0}
                    as="h1"
                    className="inline text-balance text-5xl font-semibold md:text-7xl xl:text-[5.25rem]"
                  >
                    Smarter
                  </TextEffect>{" "}
                  <TextEffect
                    preset="slide"
                    speedSegment={0.3}
                    delay={0.15}
                    as="h1"
                    className="inline text-balance text-5xl font-semibold text-amber-500 dark:text-amber-600 md:text-7xl xl:text-[5.25rem]"
                  >
                    Business
                  </TextEffect>{" "}
                  <TextEffect
                    preset="slide"
                    speedSegment={0.3}
                    delay={0.3}
                    as="h1"
                    className="inline text-balance text-5xl font-semibold md:text-7xl xl:text-[5.25rem]"
                  >
                    Management
                  </TextEffect>
                </div>

                <TextEffect
                  per="line"
                  preset="slide"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  Make data-driven decisions with real-time insights on sales,
                  inventory, and profits.
                </TextEffect>

                <AnimatedGroup
                  variants={heroGroupVariants}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link to="/dashboard">
                        <span className="text-nowrap">Get Started Free</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5 border"
                  >
                    <Link to="#features">
                      <span className="text-nowrap">Watch Demo</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>
        <section id="stats" className="container mx-auto px-4 lg:px-9 ">
          <Stats stats={stats} />
        </section>
      </main>
    </>
  );
}
