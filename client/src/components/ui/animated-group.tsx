"use client";
import React, { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

export interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
  asChild?: React.ElementType;
}

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: { hidden: { y: 20 }, visible: { y: 0 } },
  scale: { hidden: { scale: 0.8 }, visible: { scale: 1 } },
  blur: { hidden: { filter: "blur(4px)" }, visible: { filter: "blur(0px)" } },
  "blur-slide": {
    hidden: { filter: "blur(4px)", y: 20 },
    visible: { filter: "blur(0px)", y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 8 },
    },
  },
};

const baseItem: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const baseContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = "div",
  asChild = "div",
}: AnimatedGroupProps) {
  const Container = motion(as as React.ElementType);
  const Child = motion(asChild as React.ElementType);

  const itemVariants: Variants = variants?.item || {
    hidden: {
      ...baseItem.hidden,
      ...(preset ? presetVariants[preset].hidden : {}),
    },
    visible: {
      ...baseItem.visible,
      ...(preset ? presetVariants[preset].visible : {}),
    },
  };

  const containerVariants: Variants = variants?.container || baseContainer;

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, i) => (
        <Child key={i} variants={itemVariants}>
          {child}
        </Child>
      ))}
    </Container>
  );
}
