import {
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App";

const rootRoute = createRootRoute({
  component: App,
});

const router = createRouter({ routeTree: rootRoute });

export default router;