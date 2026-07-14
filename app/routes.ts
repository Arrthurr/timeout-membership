import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services.tsx"),
  route("memberships", "routes/memberships.tsx"),
  route("cafe", "routes/cafe.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),
] satisfies RouteConfig;
