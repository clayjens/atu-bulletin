"use client";

import { useRouter } from "next/navigation";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <NextUIProvider
      navigate={router.push}
      className="flex h-full w-full flex-col"
    >
      <NextThemesProvider attribute="class">
        <ClerkProvider>{children}</ClerkProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
