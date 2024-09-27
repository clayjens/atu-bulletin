"use server";

import { parseWithZod } from "@conform-to/zod";

import { insertEventSchema } from "@/db/schema";

export async function createEventFromForm(
  prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, { schema: insertEventSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log(submission.value);
}
