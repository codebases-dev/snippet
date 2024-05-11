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
        lineHeight: 1,
        boxShadow: "0 0 0 1px token(colors.gray.200) inset",
        gap: "1rem",
        background: "white",
      })}
      style={{
        viewTransitionName: `snippet-card-${snippet.id}`,
      }}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          width: "100%",
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
            style={{
              viewTransitionName: `snippet-avatar-${snippet.id}`,
            }}
          />
        )}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            lineHeight: 1,
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
            style={{
              viewTransitionName: `snippet-display-name-${snippet.id}`,
            }}
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
            style={{
              viewTransitionName: `snippet-username-${snippet.id}`,
            }}
          >
            @{snippet.user.username}
          </div>
        </div>
      </div>
      <Link
        to={`/${snippet.user.username}/${snippet.id}`}
        prefetch="intent"
        unstable_viewTransition
      >
        <h2
          className={css({
            marginY: "-0.125rem",
            fontSize: "1.25rem",
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
          style={{
            viewTransitionName: `snippet-title-${snippet.id}`,
          }}
        >
          {snippet.title}
        </h2>
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: snippet.codeHtml }}
        style={{
          viewTransitionName: `snippet-code-${snippet.id}`,
        }}
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
