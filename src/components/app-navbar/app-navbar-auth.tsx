import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, NavbarContent, NavbarItem } from "@nextui-org/react";

import { ThemeToggle } from "../app-theme-toggle";

export default function AppNavbarAuthSection() {
  return (
    <NavbarContent justify="end">
      <ThemeToggle />
      <SignedOut>
        <NavbarItem>
          <SignInButton mode="modal">
            <Button color="primary" variant="flat">
              Sign In
            </Button>
          </SignInButton>
        </NavbarItem>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </NavbarContent>
  );
}
