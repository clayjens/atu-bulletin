import { NextResponse } from "next/server";

import { fetchAllEvents } from "@/features/event/actions";

export async function GET() {
  const events = await fetchAllEvents();

  return NextResponse.json(events);
}
