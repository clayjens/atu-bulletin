import CreateEventModal from "@/features/events/components/create-event-modal";
import EventList from "@/features/events/components/event-list";

export default async function Events() {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <CreateEventModal />

      {/* TODO: Starting Soon */}

      <section className="m-0 rounded-xl bg-[url(/corkboard.jpg)] bg-repeat">
        <h1 className="w-full rounded-t-xl bg-black/20 p-4 text-3xl font-semibold text-white">
          Upcoming Events
        </h1>
        <div className="p-4">
          <EventList />
        </div>
      </section>

      <section className="m-0 rounded-xl bg-[url(/corkboard.jpg)] bg-repeat">
        <h1 className="w-full rounded-t-xl bg-black/20 p-4 text-3xl font-semibold text-white">
          Current Events
        </h1>
        <div className="p-4">
          <EventList />
        </div>
      </section>

      <section className="m-0 rounded-xl bg-[url(/corkboard.jpg)] bg-repeat">
        <h1 className="w-full rounded-t-xl bg-black/20 p-4 text-3xl font-semibold text-white">
          Future Events
        </h1>
        <div className="p-4">
          <EventList />
        </div>
      </section>

      <section className="m-0 rounded-xl bg-[url(/corkboard.jpg)] bg-repeat">
        <h1 className="w-full rounded-t-xl bg-black/20 p-4 text-3xl font-semibold text-white">
          Past Events
        </h1>
        <div className="p-4">
          <EventList />
        </div>
      </section>
    </div>
  );
}
