import { URLS } from "@/app/routers/app.urls";
import { lazy } from "react";
import { Route } from "./types";
import React from "react";

const Main = lazy(() => import("@/pages/main/ui/main"));

export const PublicRoutes: Route[] = [
    {
        path: URLS.MAIN,
        element: React.createElement(Main)
    }
];
