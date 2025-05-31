import { Route as rootRoute } from "@tanstack/react-router";
import { App } from "./routes/App";

export const Route = rootRoute.create({ component: App });

export const routeTree = [Route]; 
