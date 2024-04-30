import { format } from "@formkit/tempo";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import hljs from "highlight.js";
import { css, cx } from "styled-system/css";
import invariant from "tiny-invariant";
import { Container } from "~/components/container";
import "highlight.js/styles/github-dark.css";
import { getGraphqlClient } from "~/graphql-client";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.user, `params.user is required`);
  invariant(params.snippet, `params.snippet is required`);

  const { snippet } = await getGraphqlClient(
    context.cloudflare.env.API_URL
  ).GetSnippet({
    id: params.snippet,
  });

  const transformedSnippet = {
    ...snippet,
    codeHtml: hljs.highlight(snippet.code, { language: snippet.language })
      .value,
    postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
  };

  return json({
    snippet: transformedSnippet,
  });
};

export default function SnippetPage() {
  const { snippet } = useLoaderData<typeof loader>();

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
                width: "3rem",
                height: "3rem",
                borderRadius: "full",
                border: "1px solid",
                borderColor: "gray.200",
                cursor: "pointer",
                viewTransitionName: "snippet-avatar",
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
                viewTransitionName: "snippet-display-name",
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
                viewTransitionName: "snippet-username",
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
        <h2
          className={css({
            fontSize: "3xl",
            fontWeight: "extrabold",
            lineHeight: 1.25,
            color: "gray.800",
          })}
          style={{
            viewTransitionName: `snippet-title-${snippet.id}`,
          }}
        >
          {snippet.title}
        </h2>
        <pre style={{ margin: 0 }}>
          <code
            className={cx(
              "hljs",
              css({
                borderRadius: "0.5rem",
                overflow: "hidden",
                boxSizing: "border-box",
                lineHeight: 1.75,
              })
            )}
            style={{
              viewTransitionName: `snippet-code-${snippet.id}`,
            }}
            dangerouslySetInnerHTML={{ __html: snippet.codeHtml }}
          />
        </pre>
      </div>
    </Container>
  );
}
