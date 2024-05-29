import { Link } from "@remix-run/react";
import { css, cx } from "styled-system/css";
import { Snippet } from "~/entities/snippet/model";

export interface SnippetCardProps {
  snippet: Snippet;
  getUserPageLink: (snippet: Snippet) => string;
}

export function SnippetCard({ snippet, getUserPageLink }: SnippetCardProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        borderRadius: "md",
        boxShadow: "0 0 0 1px token(colors.gray.200) inset",
        gap: "1rem",
        background: "white",
        lineHeight: 1.5,
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "2.75rem",
        })}
      >
        {snippet.user.imageUrl && (
          <Link
            to={getUserPageLink(snippet)}
            className={css({
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "full",
              border: "1px solid",
              borderColor: "gray.200",
              cursor: "pointer",
              overflow: "hidden",
            })}
          >
            <img src={snippet.user.imageUrl} alt="" />
          </Link>
        )}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          })}
        >
          <Link
            to={getUserPageLink(snippet)}
            className={css({
              fontSize: "md",
              fontWeight: "semibold",
              color: "gray.800",
              paddingLeft: "0.375rem",
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
          </Link>
          <div
            className={css({
              fontSize: "xs",
              color: "gray.600",
              paddingLeft: "0.375rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            })}
          >
            Posted on {snippet.postedAt}
          </div>
        </div>
      </div>
      <h2
        className={css({
          fontSize: "3xl",
          fontWeight: "extrabold",
          color: "gray.800",
        })}
      >
        {snippet.title}
      </h2>
      <div
        dangerouslySetInnerHTML={{ __html: snippet.highlightedCodeHtml }}
        className={cx(
          css({
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxSizing: "border-box",
            lineHeight: 1.75,
            "& pre": {
              paddingX: "1.25rem",
              paddingY: "0.875rem",
            },
          })
        )}
      />
    </div>
  );
}
