import { parseWithValibot } from "conform-to-valibot";
import * as v from "valibot";

export const submitSnippetFormSchema = v.object({
  title: v.string("Title is required"),
  language: v.picklist(["javascript"], "Invalid language"),
  code: v.string("Content is required"),
});

export function parseSubmitSnippetFormData(formData: FormData) {
  return parseWithValibot(formData, {
    schema: submitSnippetFormSchema,
  });
}
