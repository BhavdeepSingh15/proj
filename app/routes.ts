import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("services/:slug", "routes/service.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
