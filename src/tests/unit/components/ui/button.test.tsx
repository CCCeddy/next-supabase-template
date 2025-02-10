import * as React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

describe("Button", () => {
  test("renders as a button with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      cn(buttonVariants({ variant: "default", size: "default" }))
    );
  });

  test("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="#">Test Link</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Test Link" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(
      cn(buttonVariants({ variant: "default", size: "default" }))
    );
  });

  describe("variants", () => {
    const variants = [
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ] as const;

    variants.forEach((variant) => {
      test(`applies ${variant} variant correctly`, () => {
        render(<Button variant={variant}>{variant} Button</Button>);
        const button = screen.getByRole("button", {
          name: `${variant} Button`,
        });

        expect(button).toHaveClass(
          cn(buttonVariants({ variant, size: "default" }))
        );
      });
    });
  });

  describe("sizes", () => {
    const sizes = ["default", "sm", "lg", "icon"] as const;

    sizes.forEach((size) => {
      test(`applies ${size} size correctly`, () => {
        render(<Button size={size}>{size} Button</Button>);
        const button = screen.getByRole("button", { name: `${size} Button` });

        expect(button).toHaveClass(
          cn(buttonVariants({ variant: "default", size }))
        );
      });
    });
  });

  test("applies disabled attribute when disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: "Disabled Button" });

    expect(button).toBeDisabled();
  });

  test("merges custom class name with default classes", () => {
    render(<Button className="custom-class">Custom Class</Button>);
    const button = screen.getByRole("button", { name: "Custom Class" });

    expect(button).toHaveClass(
      cn(
        buttonVariants({ variant: "default", size: "default" }),
        "custom-class"
      )
    );
  });

  test("applies SVG targeting styles", () => {
    render(
      <Button>
        <svg data-testid="button-svg" />
      </Button>
    );
    const button = screen.getByRole("button");

    // Check for SVG-related parent classes
    expect(button).toHaveClass("[&_svg]:pointer-events-none");
    expect(button).toHaveClass("[&_svg]:size-4");
    expect(button).toHaveClass("[&_svg]:shrink-0");
  });
});
