import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./components/NavBar/Home/Home";
import About from "./components/NavBar/About/About";
import ProjectPage from "./components/NavBar/Projects/ProjectPage";
import Backlog from "./components/PaginatedBacklog/Backlog";

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
  path: "/projects/$projectId",
});

const backlogRoute = createRoute({
  component: Backlog,
  getParentRoute: () => rootRoute,
  path: "/projects/$projectId/backlog",
})

rootRoute.addChildren([homeRoute, aboutRoute, projectRoute, backlogRoute]);

const router = createRouter({ routeTree: rootRoute });

export default router;
