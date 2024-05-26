import { css, cx } from "styled-system/css";
import { Snippet } from "~/models/snippet.server";
import { Link } from "@remix-run/react";

export interface CardProps {
  snippet: Snippet;
}

export function Card({ snippet }: CardProps) {
  if (!snippet.highlightedCodeHtml) {
    throw new Error("snippet.highlightedCodeHtml is required");
  }

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        borderRadius: "md",
        boxShadow: "0 0 0 1px token(colors.gray.200) inset",
        gap: "1rem",
        background: "white",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "2.25rem",
        })}
      >
        {snippet.user.imageUrl && (
          <img
            src={snippet.user.imageUrl}
            alt=""
            className={css({
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "full",
              border: "1px solid",
              borderColor: "gray.200",
              cursor: "pointer",
            })}
          />
        )}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.375,
            overflow: "hidden",
          })}
        >
          <div
            className={css({
              fontSize: "sm",
              fontWeight: "semibold",
              color: "gray.800",
              paddingLeft: "0.25rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
              _hover: {
                textDecoration: "underline",
              },
            })}
          >
            {snippet.user.displayName}
          </div>
          <div
            className={css({
              fontSize: "0.6875rem",
              color: "gray.600",
              paddingLeft: "0.25rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            })}
          >
            {snippet.postedAt}
          </div>
        </div>
      </div>
      <Link to={`/${snippet.user.username}/${snippet.id}`}>
        <h2
          className={css({
            marginY: "-0.125rem",
            fontSize: "xl",
            fontWeight: "bold",
            lineHeight: "1.5rem",
            color: "gray.800",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "pointer",
            _hover: {
              opacity: 0.75,
            },
          })}
        >
          {snippet.title}
        </h2>
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: snippet.highlightedCodeHtml }}
        className={cx(
          css({
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxSizing: "border-box",
            fontSize: "0.833rem",
            lineHeight: "1.5rem",
            "& pre": {
              paddingX: "1rem",
              paddingY: "0.75rem",
            },
          })
        )}
      />
    </div>
  );
}
