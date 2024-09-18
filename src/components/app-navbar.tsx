"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NavbarLink,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { routes } from "@/config/routes";

import AppLogo from "./app-logo";
import { ThemeToggle } from "./theme-toggle";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border-b">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/">
          <NavbarBrand>
            <AppLogo />
            <p className="font-bold text-inherit">The Placeholder</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {routes.map((route) => (
          <NavbarItem key={`${route.label}-${route.href}`}>
            <NavbarLink
              href={route.href}
              color={pathname === route.href ? "primary" : "foreground"}
              aria-current={pathname === route.href ? "page" : undefined}
            >
              {route.label}
            </NavbarLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
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

      <NavbarMenu>
        <NavbarMenuItem>
          <ThemeToggle />
        </NavbarMenuItem>
        {routes.map((route) => (
          <NavbarMenuItem key={`${route.label}-${route.href}`}>
            <NavbarLink
              className="w-full"
              href={route.href ?? "#"}
              color={pathname === route.href ? "primary" : "foreground"}
              aria-current={pathname === route.href ? "page" : undefined}
              size="lg"
            >
              {route.label}
            </NavbarLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
