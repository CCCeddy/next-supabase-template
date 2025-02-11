// src/components/ui/container.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type ContainerProps = {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Container({
  asChild = false,
  className,
  children,
}: ContainerProps) {
  // Use Slot if `asChild` is true, otherwise use a div.
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={`${className} bg-foreground text-background grid place-items-center h-full text-center`}
    >
      {children}
    </Component>
  );
}
