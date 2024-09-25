import { headers } from "next/headers";

import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import env from "@/env";
import { removeUserFromDb, syncUserToDb } from "@/features/user/actions";

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
    return new Response("Error occured", {
      status: 400,
    });
  }

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const user = await syncUserToDb(evt.data);

    return new Response(JSON.stringify(user), { status: 201 });
  }

  if (evt.type === "user.deleted" && evt.data.id) {
    await removeUserFromDb(evt.data.id);

    return new Response("", { status: 204 });
  }

  return new Response("", { status: 202 });
}
