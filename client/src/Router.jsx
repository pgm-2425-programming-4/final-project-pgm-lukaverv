import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./components/NavBar/Home/Home";
import About from "./components/NavBar/About/About";
import ProjectPage from "./components/NavBar/Projects/ProjectPage";

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

const projectRoute = createRoute({
  component: ProjectPage,
  getParentRoute: () => rootRoute,
  path: "/project/$projectId",
});

rootRoute.addChildren([homeRoute, aboutRoute, projectRoute]);

const router = createRouter({ routeTree: rootRoute });

export default router;
