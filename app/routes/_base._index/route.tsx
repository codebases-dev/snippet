import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { getGraphqlClient } from "~/graphql-client";
import { format } from "@formkit/tempo";
import { Container } from "~/shared/ui/container";
import { Card } from "./ui/card";
import { generateGridStyle } from "./lib/generate-grid-style";

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

  const transformedSnippets = snippets.map((snippet) => {
    return {
      ...snippet,
      highlightedCodeHtml: snippet.highlightedCodeHtml ?? undefined,
      postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
    };
  });
  return json({
    snippets: transformedSnippets,
    gridStyle: generateGridStyle(transformedSnippets, "grid-container"),
  });
}

export default function Index() {
  const { snippets, gridStyle } = useLoaderData<typeof loader>();

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: gridStyle }} />
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
