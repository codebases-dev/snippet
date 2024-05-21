import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { Card, generateGridStyleHtml } from "~/components/card";
import { getGraphqlClient } from "~/graphql-client";
import { format } from "@formkit/tempo";
import { Container } from "~/components/container";
import { getHighlightCodes } from "~/api/highlight";

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

  const truncatedSnippets = snippets.map((snippet) => ({
    ...snippet,
    truncatedCode: snippet.code.split("\n").slice(0, 20).join("\n"),
  }));

  const highlightedSnippets = await getHighlightCodes(
    truncatedSnippets.map((snippet) => snippet.code),
    context.cloudflare.env.HIGHLIGHT_API_URL
  );
  highlightedSnippets.sort((a, b) => a.index - b.index);

  const transformedSnippets = await Promise.all(
    truncatedSnippets.map(async (snippet, index) => {
      return {
        ...snippet,
        code: snippet.truncatedCode,
        codeHtml: highlightedSnippets[index].html,
        viewCount: 0, // TODO: Implement view count
        likeCount: 0, // TODO: Implement like count
        commentCount: 0, // TODO: Implement comment count
        postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
      };
    })
  );

  return json({
    snippets: transformedSnippets,
    gridStyleHtml: generateGridStyleHtml(transformedSnippets, "grid-container"),
  });
}

export default function Index() {
  const { snippets, gridStyleHtml } = useLoaderData<typeof loader>();

  return (
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
        <div className="grid-container">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              style={{
                gridArea: `item${snippet.id}`,
              }}
            >
              <Card snippet={snippet} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
