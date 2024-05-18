import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { Card, generateCardStyleHtml } from "~/components/card";
import { getGraphqlClient } from "~/graphql-client";
import { format } from "@formkit/tempo";
import { Container } from "~/components/container";
import { getHighlighterCore } from "shiki/core";
import githubDarkDimed from "shiki/themes/github-dark-dimmed.mjs";
import js from "shiki/langs/javascript.mjs";
import getWasm from "shiki/wasm";

export const meta: MetaFunction = () => {
  return [
    { title: "Codebases Snippet" },
    {
      name: "description",
      content: "Welcome to Codebases Snippet! Here you can find code snippets.",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const client = getGraphqlClient(context.cloudflare.env.API_URL);

  const { snippets } = await client.GetSnippets();

  const highlighter = await getHighlighterCore({
    themes: [githubDarkDimed],
    langs: [js],
    loadWasm: getWasm,
  });

  const transformedSnippets = snippets.map((snippet) => {
    const truncatedCode = snippet.code.split("\n").slice(0, 20).join("\n");

    return {
      ...snippet,
      code: truncatedCode,
      codeHtml: highlighter.codeToHtml(truncatedCode, {
        lang: snippet.language,
        theme: "github-dark-dimmed",
      }),
      viewCount: 0, // TODO: Implement view count
      likeCount: 0, // TODO: Implement like count
      commentCount: 0, // TODO: Implement comment count
      postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
    };
  });

  return json({
    snippets: transformedSnippets,
    cardStyleHtml: generateCardStyleHtml(transformedSnippets),
  });
}

export default function Index() {
  const { snippets, cardStyleHtml } = useLoaderData<typeof loader>();

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: cardStyleHtml }} />
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
        <ul className="card-list">
          {snippets.map((snippet) => (
            <li
              key={snippet.id}
              style={{
                gridArea: `item${snippet.id}`,
              }}
            >
              <Card snippet={snippet} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
