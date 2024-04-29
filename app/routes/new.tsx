import { getAuth } from "@clerk/remix/ssr.server";
import { ActionFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Form, useActionData } from "@remix-run/react";
import { css } from "styled-system/css";
import { getGraphqlClient } from "~/graphql-client";

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;

  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/");
  }

  const data = await request.formData();
  let errors: Record<string, { errors: string[] }> = {};

  if (data.get("title") === "") {
    errors = {
      ...errors,
      title: {
        errors: ["Title is required"],
      },
    };
  }

  if (data.get("code") === "") {
    errors = {
      ...errors,
      code: {
        errors: ["Code is required"],
      },
    };
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  const client = getGraphqlClient(context.cloudflare.env.API_URL);
  await client.CreateSnippet({
    userId: userId,
    title: data.get("title")!.toString(),
    language: data.get("language")!.toString(),
    code: data.get("code")!.toString(),
  });

  return redirect("/");
}

export default function New() {
  const lastResult = useActionData<typeof action>();
  const errors = lastResult?.errors;

  return (
    <Form method="post">
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        {errors?.title?.errors?.map((error) => (
          <p key={error} className={css({ color: "red.500" })}>
            {error}
          </p>
        ))}
      </div>
      <div>
        <label htmlFor="language">Language</label>
        <select name="language">
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <div>
        <label htmlFor="code">Content</label>
        <textarea name="code"></textarea>
        {errors?.code?.errors?.map((error) => (
          <p key={error} className={css({ color: "red.500" })}>
            {error}
          </p>
        ))}
      </div>
      <button
        type="submit"
        className={css({
          paddingX: "0.75rem",
          height: "2.125rem",
          borderRadius: "md",
          backgroundColor: { base: "black", _hover: "gray.800" },
          color: "white",
          fontSize: "sm",
          lineHeight: 1,
          fontWeight: "semibold",
          cursor: "pointer",
        })}
      >
        Create
      </button>
    </Form>
  );
}
