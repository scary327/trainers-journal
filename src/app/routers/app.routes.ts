import { URLS } from "@/app/routers/app.urls";
import { lazy } from "react";
import { Route } from "./types";
import React from "react";

const Profile = lazy(() => import("@/pages/profile/"));
const UserPage = lazy(() => import("@/pages/userPage/"));
const CalendarPage = lazy(() => import("@/pages/calendarPage"));
const Auth = lazy(() => import("@/pages/auth/"));
const Groups = lazy(() => import("@/pages/groups/"));
const StudentProfile = lazy(() => import("@/pages/studentProfile/"));
const StudentCalendar = lazy(() => import("@/pages/studentCalendar/"));

export const PublicRoutes: Route[] = [
    {
        path: URLS.LOGIN,
        element: React.createElement(Auth)
    }
];

export const PrivateTrainerRoutes: Route[] = [
    {
        path: URLS.USERS,
        element: React.createElement(UserPage)
    },
    {
        path: URLS.CALENDAR,
        element: React.createElement(CalendarPage)
    },
    {
        path: URLS.GROUPS,
        element: React.createElement(Groups)
    },
    {
        path: URLS.PROFILE,
        element: React.createElement(Profile)
    }
];

export const PrivateStudentRoutes: Route[] = [
    {
        path: URLS.STUDENT_CALENDAR,
        element: React.createElement(StudentCalendar)
    },
    {
        path: URLS.STUDENT_PROFILE,
        element: React.createElement(StudentProfile)
    }
];
