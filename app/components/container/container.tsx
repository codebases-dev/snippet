import { css, cx } from "styled-system/css";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <main
      className={cx(
        css({
          padding: "1rem",
        }),
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
