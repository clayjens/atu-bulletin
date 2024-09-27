"use client";

import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Button, DatePicker, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

import { insertEventSchema } from "@/db/schema";
import LocationMap from "@/features/map/components/location-map";

import { createEventFromForm } from "../actions";

export default function EventForm() {
  const [lastResult, action] = useFormState(createEventFromForm, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: insertEventSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      {...getFormProps(form)}
      action={action}
      noValidate
      className="flex flex-col gap-1"
    >
      <Input
        type="text"
        label="Title"
        key={fields.title.key}
        name={fields.title.name}
        isInvalid={!fields.title.valid}
        errorMessage={fields.title.errors}
        description="Give your event a catchy title!"
      />

      <Textarea
        label="Description"
        key={fields.description.key}
        name={fields.description.name}
        isInvalid={!fields.description.valid}
        errorMessage={fields.description.errors}
        description="Describe your event, what's it about?"
      />

      <section className="flex gap-4">
        <DatePicker
          label="Start"
          key={fields.startsAt.key}
          name={fields.startsAt.name}
          isInvalid={!fields.startsAt.valid}
          errorMessage={fields.startsAt.errors}
          showMonthAndYearPickers
          description="When does your event start?"
          defaultValue={now(getLocalTimeZone())}
        />
        <DatePicker
          label="End"
          key={fields.endsAt.key}
          name={fields.endsAt.name}
          isInvalid={!fields.endsAt.valid}
          errorMessage={fields.endsAt.errors}
          showMonthAndYearPickers
          description="When does your event end?"
          defaultValue={now(getLocalTimeZone())}
        />
      </section>

      <LocationMap />

      <Button
        type="submit"
        isDisabled={!form.valid}
        color="primary"
        className="w-full"
      >
        Submit
      </Button>
    </form>
  );
}
