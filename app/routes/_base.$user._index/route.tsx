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
import { UserProfile } from "./ui";

export const meta: MetaFunction = () => {
  return [
    { title: "Codebases Snippet" },
    {
      name: "description",
      content: "Welcome to Codebases Snippet! Here you can find code snippets.",
    },
  ];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  invariant(params.user, `params.user is required`);

  const client = getGraphqlClient(context.cloudflare.env.API_URL);

  const { userByUsername: user, snippets } = await client.GetUserPageData({
    username: params.user,
  });

  const transformedSnippets = snippets.map((snippet) => {
    return {
      ...snippet,
      postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
    };
  });

  return json({
    user,
    snippets: transformedSnippets,
    gridStyle: generateGridStyle(transformedSnippets, "grid-container"),
  });
}

export default function UserSnippetPage() {
  const { user, snippets, gridStyle } = useLoaderData<typeof loader>();

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: gridStyle }} />

      <UserProfile
        user={user}
        className={css({
          marginTop: "1rem",
          marginBottom: "2rem",
        })}
      />
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
