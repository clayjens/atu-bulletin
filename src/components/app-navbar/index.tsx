"use client";

import { useState } from "react";

import { Navbar } from "@nextui-org/react";

import AppNavbarAuthSection from "./app-navbar-auth";
import AppNavbarBrand from "./app-navbar-brand";
import AppNavbarLinksSection from "./app-navbar-links";
import AppNavbarMenuSection from "./app-navbar-menu";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="border-b">
      <AppNavbarBrand isMenuOpen={isMenuOpen} />
      <AppNavbarLinksSection />
      <AppNavbarAuthSection />
      <AppNavbarMenuSection />
    </Navbar>
  );
}
