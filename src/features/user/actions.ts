"use server";

import { type UserJSON, auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { insertUserSchema, user } from "@/db/schema";

export async function getUser(clerkId: string) {
  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.clerkId, clerkId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getCurrentUser() {
  const { userId } = auth();

  if (!userId) throw new Error("User not logged in");

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.clerkId, userId),
  });

  if (!user) throw new Error("User not found");

  return user;
}

export async function syncUserToDb(userData: UserJSON) {
  const parsedUser = insertUserSchema.parse({
    clerkId: userData.id,
    createdAt: new Date().toString(),
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
