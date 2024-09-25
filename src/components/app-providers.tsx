"use client";

import { useRouter } from "next/navigation";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    <NextUIProvider
      // @ts-expect-error not using next router
      navigate={router.push}
      className="flex h-full w-full flex-col"
    >
      <NextThemesProvider attribute="class">
        <ClerkProvider>
          <APIProvider apiKey="AIzaSyDGJ08Gn2QHDjO1t0i8YFW7_Fc9P-C4H24">
            {children}
          </APIProvider>
        </ClerkProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
