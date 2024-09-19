"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import CreateEventForm from "@/features/events/components/create-event-form";
import { getRandomRotation, getRandomStyle } from "@/utils/sticky-note-helper";

export default function CreateEventModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const randomStyle = getRandomStyle();
  const randomRotation = getRandomRotation();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create Event
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        className={randomStyle.base}
        style={{
          transform: `rotate(${randomRotation}deg)`,
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Create Event</ModalHeader>
              <ModalBody>
                <CreateEventForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}
