"use client";

import { useRouter } from "next/navigation";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { APIProvider as GoogleMapsAPIProvider } from "@vis.gl/react-google-maps";
import { ThemeProvider } from "next-themes";

import env from "@/env";

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
        <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <GoogleMapsAPIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            {children}
          </GoogleMapsAPIProvider>
        </ClerkProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
