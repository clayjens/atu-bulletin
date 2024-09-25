import { fetchAllEvents } from "@/features/event/actions";
import CreateEventForm from "@/features/event/components/create-event-form";

export default async function EventsPage() {
  const events = await fetchAllEvents();

  return (
    <div>
      <h1>All Events</h1>

      <CreateEventForm />

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - Hosted by {event.host.clerkId} at{" "}
            {event.location.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
