import { format } from "@formkit/tempo";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css, cx } from "styled-system/css";
import invariant from "tiny-invariant";
import { Container } from "~/components/container";
import { getGraphqlClient } from "~/graphql-client";
import { getHighlightCode } from "~/api/highlight";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.user, `params.user is required`);
  invariant(params.snippet, `params.snippet is required`);

  const { snippet } = await getGraphqlClient(
    context.cloudflare.env.API_URL
  ).GetSnippet({
    id: params.snippet,
  });

  const codeHtml = await getHighlightCode(
    snippet.code,
    context.cloudflare.env.HIGHLIGHT_API_URL
  );

  const transformedSnippet = {
    ...snippet,
    codeHtml,
    postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
  };

  return json({
    snippet: transformedSnippet,
  });
};

export default function SnippetPage() {
  const { snippet } = useLoaderData<typeof loader>();

  if (!snippet.codeHtml) {
    throw new Error("post.codeHtml is required");
  }

  return (
    <Container
      className={css({
        maxWidth: "50rem",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
          borderRadius: "md",
          lineHeight: 1,
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
          })}
        >
          {snippet.user.imageUrl && (
            <img
              src={snippet.user.imageUrl}
              alt=""
              className={css({
                width: "3rem",
                height: "3rem",
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
              gap: "0.375rem",
              lineHeight: 1,
              overflow: "hidden",
            })}
          >
            <div
              className={css({
                fontSize: "md",
                fontWeight: "bold",
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
        <h2
          className={css({
            fontSize: "3xl",
            fontWeight: "extrabold",
            lineHeight: 1.25,
            color: "gray.800",
          })}
        >
          {snippet.title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: snippet.codeHtml }}
          className={cx(
            css({
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxSizing: "border-box",
              lineHeight: 1.75,
              "& pre": {
                padding: "1rem",
              },
            })
          )}
        />
      </div>
    </Container>
  );
}
