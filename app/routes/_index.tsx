import { json, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css, cx } from "styled-system/css";
import { Header } from "~/components/header";
import { getPosts, Post } from "~/models/post.server";
import hljs from "highlight.js";
import { Card } from "~/components/card";
import { generateGridTemplateAreas } from "~/utils/grid";
import { Container } from "~/components/container";

export const meta: MetaFunction = () => {
  return [
    { title: "Codebases Snippets" },
    {
      name: "description",
      content:
        "Welcome to Codebases Snippets! Here you can find code snippets.",
    },
  ];
};

function generateGridStyleHtml(posts: Post[]) {
  return `
    <style>
      .card-list {
        grid-template-areas: ${generateGridTemplateAreas(posts, 4)};
        grid-template-columns: repeat(4, 28rem);
      }
      
      @media (max-width: calc(28rem * 4 + 1rem)) {
        .card-list {
          grid-template-areas: ${generateGridTemplateAreas(posts, 3)};
          grid-template-columns: repeat(3, 28rem);
        }
      }
      
      @media (max-width: calc(28rem * 3 + 1rem)) {
        .card-list {
          grid-template-areas: ${generateGridTemplateAreas(posts, 2)};
          grid-template-columns: repeat(2, 28rem);
        }
      }
      
      @media (max-width: calc(28rem * 2 + 1rem)) {
        .card-list {
          grid-template-areas: ${generateGridTemplateAreas(posts, 1)};
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}

export async function loader() {
  const posts = await getPosts();
  const transformedPosts = posts.map((post) => ({
    ...post,
    codeHtml: hljs.highlight(post.code, { language: post.language }).value,
  }));

  return json({
    posts: transformedPosts,
    gridStyleHtml: generateGridStyleHtml(transformedPosts),
  });
}

export default function Index() {
  const { posts, gridStyleHtml } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Header />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: gridStyleHtml }} />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "1rem",
            lineHeight: 2,
            gap: "1rem",
          })}
        >
          <ul
            className={cx(
              "card-list",
              css({
                display: "grid",
              })
            )}
          >
            {posts.map((post) => (
              <li
                key={post.id}
                className={css({
                  paddingX: "0.5rem",
                  paddingBottom: "1rem",
                })}
                style={{
                  gridArea: `item${post.id}`,
                }}
              >
                <Card post={post} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
