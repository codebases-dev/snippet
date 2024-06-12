import { format } from "@formkit/tempo";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import invariant from "tiny-invariant";
import { Container } from "~/shared/ui/container";
import { getGraphqlClient } from "~/graphql-client";
import { SnippetCard } from "~/widgets/snippet-card/ui";

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.user, `params.user is required`);
  invariant(params.snippet, `params.snippet is required`);

  const { snippet } = await getGraphqlClient(
    context.cloudflare.env.API_URL
  ).GetSnippet({
    id: params.snippet,
  });

  invariant(
    snippet.__typename === "QuerySnippetSuccess",
    "Failed to load snippet"
  );

  const transformedSnippet = {
    ...snippet.data,
    postedAt: format(new Date(snippet.data.postedAt), "MMM D, YYYY", "en"),
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
        maxWidth: "48rem",
      })}
    >
      <SnippetCard snippet={snippet} />
    </Container>
  );
}
