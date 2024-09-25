"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import slugify from "slugify";

import { db } from "@/db";
import { event, insertEventSchema, location } from "@/db/schema";

export async function createLocation(lat: number, lng: number) {
  try {
    const newLocation = await db
      .insert(location)
      .values({
        latitude: lat,
        longitude: lng,
        address: "",
      })
      .returning();

    return newLocation[0].id;
  } catch (error) {
    console.error("Error inserting location:", error);
    throw new Error("Failed to create location.");
  }
}

export async function fetchAllEvents() {
  const events = await db.query.event.findMany({
    with: {
      location: true,
      host: true,
    },
  });

  return events;
}

export async function createEvent(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: insertEventSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const slug = slugify(submission.value.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  try {
    const existingEvent = await db.query.event.findFirst({
      where: (events, { or, eq }) =>
        or(eq(events.slug, slug), eq(events.title, submission.value.title)),
    });

    if (existingEvent) {
      return submission.reply({
        fieldErrors: {
          title: ["An event with this title already exists."],
        },
      });
    }

    await db.insert(event).values({
      title: submission.value.title,
      description: submission.value.description,
      slug,
      hostId: 1,
      locationId: 2,
    });

    revalidatePath("/events");
    redirect("/events");
  } catch (error) {
    console.error("Error inserting event:", error);
    throw new Error("Failed to create event. Please try again.");
  }
}
