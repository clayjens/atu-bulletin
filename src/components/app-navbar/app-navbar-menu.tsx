import { usePathname } from "next/navigation";

import {
  Link as NavbarLink,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { routes } from "@/config/routes";

export default function AppNavbarMenuSection() {
  const pathname = usePathname();

  return (
    <NavbarMenu>
      {routes.map((route) => {
        // This regex is used to match the exact route (e.g. /profile) or any nested routes (e.g. /profile/security)
        const isActive = new RegExp(`^${route.href}(/|$)`).test(pathname);

        return (
          <NavbarMenuItem key={`${route.label}-${route.href}`}>
            <NavbarLink
              className="w-full"
              href={route.href ?? "#"}
              color={isActive ? "primary" : "foreground"}
              aria-current={isActive ? "page" : undefined}
              size="lg"
            >
              {route.label}
            </NavbarLink>
          </NavbarMenuItem>
        );
      })}
    </NavbarMenu>
  );
}
