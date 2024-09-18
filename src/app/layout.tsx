import type { Metadata } from "next";
import { Lato } from "next/font/google";

import AppNavbar from "@/components/app-navbar";
import AppProviders from "@/components/app-providers";
import { cn } from "@/utils/cn";

import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Placeholder",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📌</text></svg>"
        />
      </head>
      <body
        className={cn(
          "h-screen w-screen overflow-auto bg-[url(/corkboard.jpg)] bg-cover bg-repeat antialiased",
          lato.variable
        )}
      >
        <div className="absolute inset-0 z-0 bg-black opacity-20"></div>
        <AppProviders>
          <AppNavbar />
          <main className="m-4 flex-grow">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
