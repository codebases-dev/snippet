import { getFormProps, SubmissionResult, useForm } from "@conform-to/react";
import { Form } from "@remix-run/react";
import { css } from "styled-system/css";
import { Input, TextArea, Select } from "~/shared/ui/input";
import { Button } from "~/shared/ui/button";
import { parseSubmitSnippetFormData } from "../schema";

export interface SubmitSnippetFormProps {
  submissionResult?: SubmissionResult<string[]>;
}

export function SubmitSnippetForm({
  submissionResult,
}: SubmitSnippetFormProps) {
  const [form, { title, language, code }] = useForm({
    lastResult: submissionResult,
    onValidate: ({ formData }) => parseSubmitSnippetFormData(formData),
  });

  return (
    <Form
      method="post"
      {...getFormProps(form)}
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      })}
    >
      <Input label="Title" name="title" errors={title.errors} />
      <Select
        name="language"
        label="Language"
        options={[
          {
            value: "javascript",
            label: "JavaScript",
          },
        ]}
        errors={language.errors}
      />
      <TextArea name="code" label="Code" errors={code.errors} rows={10} />
      <Button type="submit">Create</Button>
    </Form>
  );
}
