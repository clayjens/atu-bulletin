"use client";

import { useRouter } from "next/navigation";

import { NextUIProvider } from "@nextui-org/react";
import { APIProvider as GoogleMapsAPIProvider } from "@vis.gl/react-google-maps";
import { ThemeProvider } from "next-themes";

import env from "@/env";

import CustomClerkProvider from "./providers/custom-clerk-provider";

export default function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <NextUIProvider
      navigate={router.push}
      className="flex h-full w-full flex-col"
    >
      <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
        <CustomClerkProvider>
          <GoogleMapsAPIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            {children}
          </GoogleMapsAPIProvider>
        </CustomClerkProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
