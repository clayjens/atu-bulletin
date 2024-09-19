"use server";

import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";

import { InsertEventSchema } from "@/db/schema";

export async function createEvent(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: InsertEventSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect("/events");
}

export async function getEvents() {}

export async function getEvent() {}

export async function searchEvents() {}

export async function updateEvent() {}

export async function deleteEvent() {}
