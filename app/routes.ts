import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.route.tsx"),
  route("room", "routes/room.route.tsx"),
] satisfies RouteConfig;
