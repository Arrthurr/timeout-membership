import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services.tsx"),
  route("cafe", "routes/cafe.tsx"),
] satisfies RouteConfig;
