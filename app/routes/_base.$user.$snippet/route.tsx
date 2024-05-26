import { format } from "@formkit/tempo";
import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import invariant from "tiny-invariant";
import { Container } from "~/shared/ui/container";
import { getGraphqlClient } from "~/graphql-client";
import { Card } from "./ui/card";

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
    highlightedCodeHtml: snippet.highlightedCodeHtml ?? undefined,
    postedAt: format(new Date(snippet.postedAt), "MMM D, YYYY", "en"),
  };

  return json({
    snippet: transformedSnippet,
  });
};

export default function SnippetPage() {
  const { snippet } = useLoaderData<typeof loader>();

  if (!snippet.highlightedCodeHtml) {
    throw new Error("snippet.highlightedCodeHtml is required");
  }

  return (
    <Container
      className={css({
        maxWidth: "48rem",
      })}
    >
      <Card snippet={snippet} />
    </Container>
  );
}
