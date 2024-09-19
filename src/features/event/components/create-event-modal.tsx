"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useFormState } from "react-dom";

import { InsertEventSchema } from "@/db/schema";
import { createEvent } from "@/features/event/actions";

export default function CreateEventModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <>
      <Button onPress={onOpen}>Create Event</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Create Event</ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-4"
                  id={form.id}
                  onSubmit={form.onSubmit}
                  action={action}
                  noValidate
                >
                  <Input
                    label="Title"
                    placeholder="Give your event a title"
                    type="text"
                    key={fields.title.key}
                    defaultValue={fields.title.initialValue}
                  />
                  <p>{fields.title.errors}</p>
                  <Textarea
                    label="Description"
                    placeholder="Describe your event"
                    type="text"
                    key={fields.description.key}
                    defaultValue={fields.description.initialValue}
                  />
                  <p>{fields.description.errors}</p>
                  <ModalFooter className="flex gap-2">
                    <Button color="primary" className="w-full" type="submit">
                      Create
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
