import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Profile() {
  const { userId } = auth();

  if (userId) {
    // TODO: Query DB for user-specific information
  }

  const user = await currentUser();

  return <>{JSON.stringify(user)}</>;
}
