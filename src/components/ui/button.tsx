import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-foreground/30 bg-transparent hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Diptyque-inspired variants
        hero: "bg-foreground text-background text-[10px] md:text-[11px] uppercase tracking-[0.20em] font-normal hover:bg-foreground/85 shadow-elegant rounded-xl",
        availability: "border border-foreground/25 bg-transparent text-[10px] md:text-[11px] uppercase tracking-[0.20em] font-normal hover:bg-foreground hover:text-background transition-all duration-500 rounded",
        linkArrow: "text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-foreground hover:text-muted-foreground bg-transparent p-0 h-auto underline underline-offset-4",
        diptyque: "border border-foreground text-foreground bg-transparent text-[10px] md:text-[11px] uppercase tracking-[0.24em] font-normal hover:bg-foreground hover:text-background transition-all duration-500 rounded",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        // Custom sizes
        hero: "h-auto px-8 md:px-10 py-4 md:py-5",
        nav: "h-auto px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
