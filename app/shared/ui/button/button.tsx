import { Slot } from "@radix-ui/react-slot";
import { cva, cx, RecipeVariantProps } from "styled-system/css";

const buttonStyle = cva({
  base: {
    paddingX: "0.75rem",
    height: "2.25rem",
    borderRadius: "md",
    fontSize: "sm",
    lineHeight: 1,
    fontWeight: "semibold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    variant: {
      filled: {
        backgroundColor: { base: "black", _hover: "gray.800" },
        color: "white",
      },
      transparent: {
        backgroundColor: "transparent",
        color: { base: "black", _hover: "gray.700" },
      },
    },
  },
  defaultVariants: {
    variant: "filled",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  RecipeVariantProps<typeof buttonStyle> & {
    asChild?: boolean;
  };

export function Button({ asChild, variant, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cx(buttonStyle({ variant }), className)} {...props} />
  );
}
