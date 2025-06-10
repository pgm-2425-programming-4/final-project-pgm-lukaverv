import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./components/NavBar/Home/Home";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  component: Home,
  getParentRoute: () => rootRoute,
  path: "/",
});

rootRoute.addChildren([homeRoute]);

const router = createRouter({ routeTree: rootRoute });

export default router;