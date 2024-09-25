import { headers } from "next/headers";

import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Webhook } from "svix";

import { db } from "@/db";
import { user } from "@/db/schema";
import env from "@/env";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured -- invalid svix headers", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    const [createdUser] = await db
      .insert(user)
      .values({
        clerkId: evt.data.id,
        updatedAt: new Date().toString(),
      })
      .returning();

    console.log(createdUser);

    // await db.insert(preferences).values({
    //   userId: user.id,
    //   theme: "light",
    // });
  }

  if (evt.type === "user.updated") {
    await db
      .update(user)
      .set({ updatedAt: new Date().toString() })
      .where(eq(user.clerkId, evt.data.id));
  }

  if (evt.type === "user.deleted" && evt.data.id) {
    await db.delete(user).where(eq(user.clerkId, evt.data.id));
  }

  return new Response("", { status: 200 });
}
