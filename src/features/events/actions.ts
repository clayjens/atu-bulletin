"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import slugify from "slugify";

import { db } from "@/db";
import { InsertEventSchema, events } from "@/db/schema";

export async function createEvent(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: InsertEventSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const slug = slugify(submission.value.title, { lower: true, strict: true });

  const isUnique = await isEventSlugUnique(slug);

  if (!isUnique) {
    return submission.reply({
      fieldErrors: {
        title: [
          "An event with this title already exists, please choose another title.",
        ],
      },
    });
  }

  await db.insert(events).values({
    title: submission.value.title,
    description: submission.value.description,
    slug,
  });

  revalidatePath("/events");
  redirect("/events");
}

async function isEventSlugUnique(slug: string) {
  const result = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.slug, slug),
  });
  return result === undefined;
}

export async function getEvents() {
  const events = await db.query.events.findMany();

  return events;
}
