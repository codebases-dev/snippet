import { Snippet } from "~/models/snippet.server";

function calculateCodeLineCount(code: string) {
  return code.endsWith("\n")
    ? code.split("\n").length - 1
    : code.split("\n").length;
}

export function calculateCardHeight(post: Snippet) {
  const codeLineCount = calculateCodeLineCount(post.code);
  return codeLineCount * 1.5 + 11.5;
}
