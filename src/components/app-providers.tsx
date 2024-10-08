"use client";

import { useRouter } from "next/navigation";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

import CustomClerkProvider from "./providers/custom-clerk-provider";
import CustomMapProvider from "./providers/custom-map-provider";

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
          <CustomMapProvider>{children}</CustomMapProvider>
        </CustomClerkProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
