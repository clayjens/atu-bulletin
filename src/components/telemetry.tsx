import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Telemetry({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Analytics />
      <SpeedInsights />

      {children}
    </>
  );
}
