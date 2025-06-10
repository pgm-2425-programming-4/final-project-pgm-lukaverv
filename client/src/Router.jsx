import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./components/NavBar/Home/Home";
import About from "./components/NavBar/About/ABout";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  component: Home,
  getParentRoute: () => rootRoute,
  path: "/",
});

const aboutRoute = createRoute({
  component: About,
  getParentRoute: () => rootRoute,
  path: "/about",
});



rootRoute.addChildren([homeRoute, aboutRoute]);

const router = createRouter({ routeTree: rootRoute });

export default router;
