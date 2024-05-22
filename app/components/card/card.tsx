import { css, cx } from "styled-system/css";
import { EyeIcon, HeartIcon, MessageCircleMoreIcon } from "lucide-react";
import { Snippet } from "~/models/snippet.server";
import { Link } from "@remix-run/react";

interface CardProps {
  snippet: Snippet;
}

export function Card({ snippet }: CardProps) {
  if (!snippet.codeHtml) {
    throw new Error("post.codeHtml is required");
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
          gap: "0.25rem",
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
            lineHeight: 1.25,
            overflow: "hidden",
          })}
        >
          <div
            className={css({
              fontSize: "sm",
              fontWeight: "semibold",
              color: "gray.800",
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
              fontSize: "xs",
              color: "gray.600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
              _hover: {
                textDecoration: "underline",
              },
            })}
          >
            @{snippet.user.username}
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
        dangerouslySetInnerHTML={{ __html: snippet.codeHtml }}
        className={cx(
          css({
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxSizing: "border-box",
            fontSize: "0.833rem",
            lineHeight: "1.5rem",
            "& pre": {
              padding: "1rem",
            },
          })
        )}
      />
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          color: "gray.600",
          gap: "1rem",
          fontSize: "0.7125rem",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.125rem",
          })}
        >
          <EyeIcon size={16} strokeWidth={1.25} />
          <div>{snippet.viewCount}</div>
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.125rem",
          })}
        >
          <HeartIcon size={16} strokeWidth={1.25} />
          <div>{snippet.likeCount}</div>
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.125rem",
          })}
        >
          <MessageCircleMoreIcon size={16} strokeWidth={1.25} />
          <div>{snippet.commentCount}</div>
        </div>
        <div
          className={css({
            marginLeft: "auto",
          })}
        >
          {snippet.postedAt}
        </div>
      </div>
    </div>
  );
}
