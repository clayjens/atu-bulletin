type Route = {
  label: string;
  href: string;
  isPublic?: boolean;
};

export const routes: Route[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Informational", href: "/informational" },
  { label: "Map", href: "/map" },
];

export const publicRoutes = routes.filter((route) => route.isPublic);
