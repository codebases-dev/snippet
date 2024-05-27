import { getAuth } from "@clerk/remix/ssr.server";
import { ActionFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { Link, useActionData } from "@remix-run/react";
import { css } from "styled-system/css";
import { getGraphqlClient } from "~/graphql-client";
import { ChevronLeftIcon } from "lucide-react";
import { SubmitSnippetForm } from "~/features/submit-snippet/ui";
import { parseSubmitSnippetFormData } from "~/features/submit-snippet/schema";

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;

  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/");
  }

  const formData = await request.formData();
  const submission = parseSubmitSnippetFormData(formData);

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

  return (
    <div
      className={css({
        background: "gray.50",
        minHeight: "100vh",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          maxWidth: "36rem",
          marginX: "auto",
          paddingX: "2rem",
          height: "4rem",
        })}
      >
        <Link
          to="/"
          className={css({
            position: "relative",
            color: "gray.500",
            fontSize: "sm",
            fontWeight: "semibold",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "gray.600",
            },
          })}
        >
          <ChevronLeftIcon
            size={16}
            className={css({
              position: "absolute",
              transform: "translateY(0.0625rem) translateX(-1rem)",
            })}
          />
          Go Back
        </Link>
      </div>
      <div
        className={css({
          maxWidth: "36rem",
          marginX: "auto",
          paddingX: "2rem",
        })}
      >
        <SubmitSnippetForm submissionResult={formData?.submission} />
      </div>
    </div>
  );
}
