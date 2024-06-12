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
import { SnippetPreviewCard } from "~/widgets/snippet-card/ui";
import { generateGridStyle } from "~/widgets/snippet-card/lib/generate-grid-style";
import invariant from "tiny-invariant";

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

  invariant(
    snippets.__typename === "QuerySnippetsSuccess",
    "Failed to load snippets"
  );

  const transformedSnippets = snippets.data.map((snippet) => {
    return {
      ...snippet,
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
              <SnippetPreviewCard snippet={snippet} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
