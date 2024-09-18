"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { ArrowLeft, Frown } from "react-feather";

import StickyNote from "@/components/sticky-note";
import { cn } from "@/utils/cn";
import { getRandomStyle } from "@/utils/sticky-note-helper";

export default function NotFound() {
  const { back } = useRouter();
  const pathname = usePathname();
  const style = getRandomStyle();

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <StickyNote style={style}>
        <CardHeader>
          <section className="flex flex-col">
            <h1 className="flex items-center text-lg font-semibold">
              <Frown className="mr-1" />
              404 Not Found{" "}
              <span className="ml-1 text-sm text-gray-600">({pathname})</span>
            </h1>
            <p>The page you have tried to access does not exist.</p>
          </section>
        </CardHeader>

        <CardBody>
          <p>
            If you believe this is a problem, please reach out to{" "}
            <Link href="/support">Support</Link>.
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button onClick={back} className={cn("w-full", style.base)}>
            <ArrowLeft />
            <span className="font-bold">Go Back</span>
          </Button>
        </CardFooter>
      </StickyNote>
    </div>
  );
}
