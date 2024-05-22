import { getAuth } from "@clerk/remix/ssr.server";
import { ActionFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Form, Link, useActionData } from "@remix-run/react";
import { css } from "styled-system/css";
import { getGraphqlClient } from "~/graphql-client";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import * as v from "valibot";

const formSchema = v.object({
  title: v.string("Title is required"),
  language: v.picklist(["javascript"], "Invalid language"),
  code: v.string("Content is required"),
});

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;

  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const submission = parseWithValibot(formData, {
    schema: formSchema,
  });

  if (submission.status !== "success") {
    return json({
      success: false,
      message: "Validation failed",
      submission: submission.reply(),
    });
  }

  const client = getGraphqlClient(context.cloudflare.env.API_URL);

  try {
    await client.CreateSnippet({
      userId: userId,
      title: formData.get("title")!.toString(),
      language: formData.get("language")!.toString(),
      code: formData.get("code")!.toString(),
    });
  } catch (error) {
    return json({
      success: false,
      message: "Failed to create snippet",
      submission: submission.reply(),
    });
  }

  return redirect("/");
}

export default function New() {
  const formData = useActionData<typeof action>();

  const [form, { title, language, code }] = useForm({
    lastResult: formData?.submission,
    onValidate({ formData }) {
      return parseWithValibot(formData, {
        schema: formSchema,
      });
    },
  });

  return (
    <div
      className={css({
        padding: "1rem",
      })}
    >
      <Link
        to="/"
        className={css({
          color: "blue.900",
          textDecoration: "underline",
        })}
      >
        Back to home
      </Link>
      <Form method="post" {...getFormProps(form)}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
          {title.errors && (
            <div>
              {title.errors.map((e, index) => (
                <p key={index} className={css({ color: "red.500" })}>
                  {e}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="language">Language</label>
          <select name="language">
            <option value="javascript">JavaScript</option>
          </select>
          {language.errors && (
            <div>
              {language.errors.map((e, index) => (
                <p key={index} className={css({ color: "red.500" })}>
                  {e}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="code">Content</label>
          <textarea name="code"></textarea>
          {code.errors && (
            <div>
              {code.errors.map((e, index) => (
                <p key={index} className={css({ color: "red.500" })}>
                  {e}
                </p>
              ))}
            </div>
          )}
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
    </div>
  );
}
