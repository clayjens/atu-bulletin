"use server";

import type { UserJSON } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { insertUserSchema, user } from "@/db/schema";

export async function syncUserToDb(userData: UserJSON) {
  const parsedUser = insertUserSchema.parse({
    email: userData.email_addresses[0].email_address,
    firstName: userData.first_name,
    lastName: userData.last_name,
    clerkId: userData.id,
    createdAt: new Date().toString(),
    ...userData,
  });

  const syncedUser = await db
    .insert(user)
    .values(parsedUser)
    .onConflictDoUpdate({
      target: user.clerkId,
      set: {
        ...parsedUser,
      },
    })
    .returning();

  return syncedUser;
}

export async function removeUserFromDb(clerkId: string) {
  await db.delete(user).where(eq(user.clerkId, clerkId));
}
