import CreateEventModal from "@/features/event/components/create-event-modal";
import EventList from "@/features/event/components/event-list";

export default async function Events() {
  return (
    <>
      <CreateEventModal />
      <EventList />
    </>
  );
}
