import { css, cx } from "styled-system/css";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errors?: string[];
}

export function TextArea({
  className,
  label,
  errors,
  ...props
}: TextAreaProps) {
  return (
    <div>
      <label>
        <span
          className={css({
            display: "block",
            color: "gray.700",
            fontWeight: "semibold",
            fontSize: "sm",
          })}
        >
          {label}
        </span>
        <textarea
          data-invalid={!!errors || undefined}
          className={cx(
            css({
              display: "block",
              marginTop: "0.25rem",
              fontWeight: "medium",
              color: { _invalid: "red.500" },
              width: "100%",
              paddingX: "0.75rem",
              paddingY: "0.5rem",
              background: "white",
              border: "1px solid",
              borderColor: {
                base: "gray.400",
                _focus: "blue.600",
                _invalid: { base: "red.500", _focus: "red.500" },
              },
              borderRadius: "md",
              fontSize: "sm",
              outline: "none",
              boxShadow: {
                _focus: "0 0 0 1px token(colors.blue.600)",
                _invalid: { _focus: "0 0 0 1px token(colors.red.500)" },
              },
            }),
            className
          )}
          {...props}
        />
      </label>
      {errors && (
        <div
          className={css({
            marginTop: "0.25rem",
            color: "red.500",
            fontWeight: "medium",
            fontSize: "sm",
          })}
        >
          {errors.map((e, index) => (
            <p key={index}>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
}
