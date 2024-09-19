"use client";

import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { InsertEventSchema } from "@/db/schema";
import { createEvent } from "@/features/events/actions";

export default function CreateEventForm() {
  const [lastResult, action] = useFormState(createEvent, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InsertEventSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <Input
        {...getInputProps(fields.title, { type: "text" })}
        key={fields.title.key}
        label="Title"
        isRequired
        description="Give your event a catchy title!"
        isInvalid={!!fields.title.errors}
        errorMessage={fields.title.errors?.join(", ")}
        className="bg-transparent"
        variant="faded"
      />
      <Textarea
        {...getTextareaProps(fields.description)}
        key={fields.description.key}
        label="Description"
        description="Describe your event, what's it about?"
        isInvalid={!!fields.description.errors}
        errorMessage={fields.description.errors?.join(", ")}
      />
      <Button type="submit" className="w-full" color="primary">
        Submit
      </Button>
    </form>
  );
}
