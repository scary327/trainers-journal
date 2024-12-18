import { createBrowserRouter } from "react-router-dom";
import { PrivateStudentRoutes, PrivateTrainerRoutes, PublicRoutes } from "@/app/routers/app.routes";
import { Layout, PrivateRoute } from "@/shared/ui";
import { ErrorElement } from "@/app/routers/errorElement/errorElement";

export const appRouter = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            ...PublicRoutes,
            ...PrivateTrainerRoutes.map((route) => ({
                ...route,
                element: <PrivateRoute currentRole="Trainer">{route.element}</PrivateRoute>
            })),
            ...PrivateStudentRoutes.map((route) => ({
                ...route,
                element: <PrivateRoute currentRole="Student">{route.element}</PrivateRoute>
            }))
        ],
        errorElement: <ErrorElement />
    }
]);
