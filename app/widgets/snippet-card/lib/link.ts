import { Snippet } from "~/entities/snippet/model";

export function getUserPageLinkFromSnippet(snippet: Snippet) {
  return `/${snippet.user.username}`;
}

export function getSnippetPageLinkFromSnippet(snippet: Snippet) {
  return `/${snippet.user.username}/${snippet.id}`;
}
