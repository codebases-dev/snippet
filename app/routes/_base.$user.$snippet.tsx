import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log(params);
  invariant(params.user, `params.user is required`);
  invariant(params.snippet, `params.snippet is required`);

  return json({});
};

export default function SnippetPage() {
  return <div>Snippet Page</div>;
}
