import { URLS } from "@/app/routers/app.urls";
import { lazy } from "react";
import { Route } from "./types";
import React from "react";

const Main = lazy(() => import("@/pages/main/"));
const Profile = lazy(() => import("@/pages/profile/"));
const UserPage = lazy(() => import("@/pages/userPage/"));

export const PublicRoutes: Route[] = [
    {
        path: URLS.MAIN,
        element: React.createElement(Main)
    },
    {
        path: URLS.PROFILE,
        element: React.createElement(Profile)
    },
    {
        path: URLS.USERS,
        element: React.createElement(UserPage)
    }
];
