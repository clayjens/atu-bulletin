import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import env from "@/env";
import useSystemTheme from "@/hooks/use-system-theme";

interface CustomClerkProviderProps {
  children: React.ReactNode;
}

export default function CustomClerkProvider({
  children,
}: CustomClerkProviderProps) {
  const { theme } = useSystemTheme();

  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
