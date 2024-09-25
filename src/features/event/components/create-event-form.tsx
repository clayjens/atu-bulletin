"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { insertEventSchema } from "@/db/schema";

import { createEvent } from "../actions";

export default function CreateEventForm() {
  const [locationId, setLocationId] = useState(null);

  const [lastResult, action] = useFormState(createEvent, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      formData.set("locationId", locationId);
      return parseWithZod(formData, { schema: insertEventSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const EventMap = useMemo(
    () =>
      dynamic(() => import("./event-map"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <Input
        label="Title"
        key={fields.title.key}
        name={fields.title.name}
        placeholder="Name your event"
        isInvalid={!fields.title.valid}
        errorMessage={fields.title.errors}
      />
      <Textarea
        label="Description"
        key={fields.description.key}
        name={fields.description.name}
        placeholder="Describe your event"
        isInvalid={!fields.description.valid}
        errorMessage={fields.description.errors}
      />
      <EventMap setLocationId={setLocationId} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
