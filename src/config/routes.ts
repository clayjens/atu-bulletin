type Route = {
  label: string;
  href: string;
  isProtected?: boolean;
};

export const routes: Route[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile", isProtected: true },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Informational", href: "/informational" },
  { label: "Map", href: "/map" },
];

export const protectedRoutes = routes.filter((route) => route.isProtected);
