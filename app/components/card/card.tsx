import { css, cx } from "styled-system/css";
import "highlight.js/styles/github-dark.css";
import { ThumbsUpIcon } from "lucide-react";
import { Post } from "~/models/post.server";

interface CardProps {
  post: Post;
}

export function Card({ post }: CardProps) {
  if (!post.codeHtml) {
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
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          })}
        >
          {post.user.imageUrl && (
            <img
              src={post.user.imageUrl}
              alt=""
              className={css({
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "full",
                border: "1px solid",
                borderColor: "gray.200",
              })}
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
              })}
            >
              {post.user.displayName}
            </div>
            <div
              className={css({
                fontSize: "xs",
                color: "gray.600",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              })}
            >
              @{post.user.username}
            </div>
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "xs",
            color: "gray.600",
          })}
        >
          <ThumbsUpIcon size={18} />
          <div>{post.likeCount}</div>
        </div>
      </div>
      <h2
        className={css({
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "gray.800",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        })}
      >
        Card Component
      </h2>
      <pre style={{ margin: 0 }}>
        <code
          className={cx(
            "hljs",
            css({
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxSizing: "border-box",
              lineHeight: 1.5,
            })
          )}
          dangerouslySetInnerHTML={{ __html: post.codeHtml }}
        />
      </pre>
    </div>
  );
}
