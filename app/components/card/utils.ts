import { Post } from "~/models/post.server";

function calculateCodeLineCount(code: string) {
  return code.endsWith("\n")
    ? code.split("\n").length - 1
    : code.split("\n").length;
}

export function calculateCardHeight(post: Post) {
  const codeLineCount = calculateCodeLineCount(post.code);
  return codeLineCount * 1.5 + 9.5;
}
