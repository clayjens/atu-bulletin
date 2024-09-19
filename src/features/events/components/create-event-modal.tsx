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

import CreateEventForm from "./create-event-form";

export default function CreateEventModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Create Event</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
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
