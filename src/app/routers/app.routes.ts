import { URLS } from "@/app/routers/app.urls";
import { lazy } from "react";
import { Route } from "./types";
import React from "react";

const Main = lazy(() => import("@/pages/main/"));
const Profile = lazy(() => import("@/pages/profile/"));
const UserPage = lazy(() => import("@/pages/userPage/"));
const CalendarPage = lazy(() => import("@/pages/calendarPage"));
const Auth = lazy(() => import("@/pages/auth/"));
const Groups = lazy(() => import("@/pages/groups/"));

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
    },
    {
        path: URLS.CALENDAR,
        element: React.createElement(CalendarPage)
    },
    {
        path: URLS.LOGIN,
        element: React.createElement(Auth)
    },
    {
        path: URLS.GROUPS,
        element: React.createElement(Groups)
    }
];
