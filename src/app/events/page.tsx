import CreateEventModal from "@/features/events/components/create-event-modal";
import EventList from "@/features/events/components/event-list";

export default async function Events() {
  return (
    <>
      <CreateEventModal />
      <EventList />
    </>
  );
}
