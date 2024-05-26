import { css, cx } from "styled-system/css";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cx(
        css({
          padding: "1rem",
          marginLeft: "auto",
          marginRight: "auto",
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
