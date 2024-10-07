"use client";

import { UserProfile } from "@clerk/nextjs";
import { Map as MapIcon } from "react-feather";

import HostedEventsPage from "./hosted-events";

export default function ProfilePage() {
  return (
    <UserProfile>
      <UserProfile.Page
        label="Hosted Events"
        labelIcon={<MapIcon className="h-4 w-4" />}
        url="/profile/hosted-events"
      >
        <HostedEventsPage />
      </UserProfile.Page>
    </UserProfile>
  );
}
