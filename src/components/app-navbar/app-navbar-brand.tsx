import Link from "next/link";

import {
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";

import AppLogo from "../app-logo";

interface AppNavbarBrandProps {
  isMenuOpen: boolean;
}

export default function AppNavbarBrand({ isMenuOpen }: AppNavbarBrandProps) {
  return (
    <NavbarContent>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />

      <Link href="/">
        <NavbarBrand>
          <AppLogo />
          <p className="font-bold text-inherit">ATU Bulletin</p>
        </NavbarBrand>
      </Link>
    </NavbarContent>
  );
}
