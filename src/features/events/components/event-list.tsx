import { Button, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Share } from "react-feather";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";
import StickyNote from "@/components/sticky-note";
import { getEvents } from "@/features/events/actions";
import { getRandomStyle } from "@/utils/sticky-note-helper";

export default async function EventList() {
  const events = await getEvents();

  return (
    <>
      <Carousel>
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event.id} className="basis-1/3">
              <StickyNote style={getRandomStyle()} className="w-64 shadow-md">
                <CardHeader className="overflow-hidden">
                  <h1 className="truncate text-lg font-semibold">
                    {event.title}
                  </h1>
                </CardHeader>
                <CardBody>
                  <p className="line-clamp-1 overflow-hidden text-ellipsis text-sm leading-tight tracking-tight">
                    {event.description}
                  </p>
                </CardBody>
                <CardFooter className="flex gap-1">
                  <Button
                    className="w-full bg-transparent font-semibold"
                    variant="ghost"
                    color="primary"
                  >
                    View Event
                  </Button>
                  <Button isIconOnly className="bg-transparent">
                    <Share className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </StickyNote>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </>
  );
}
