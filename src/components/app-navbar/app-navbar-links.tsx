import { usePathname } from "next/navigation";

import {
  NavbarContent,
  NavbarItem,
  Link as NavbarLink,
} from "@nextui-org/react";

import { routes } from "@/config/routes";

export default function AppNavbarLinksSection() {
  const pathname = usePathname();

  return (
    <NavbarContent className="hidden gap-4 sm:flex" justify="center">
      {routes.map((route) => {
        // This regex is used to match the exact route (e.g. /profile) or any nested routes (e.g. /profile/security)
        const isActive = new RegExp(`^${route.href}(/|$)`).test(pathname);

        return (
          <NavbarItem key={`${route.label}-${route.href}`}>
            <NavbarLink
              href={route.href}
              color={isActive ? "primary" : "foreground"}
              aria-current={isActive ? "page" : undefined}
            >
              {route.label}
            </NavbarLink>
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );
}
