import { createBrowserRouter } from "react-router-dom";
import { PrivateTrainerRoutes, PublicRoutes } from "@/app/routers/app.routes";
import { Layout } from "@/shared/ui";
import { ErrorElement } from "@/app/routers/errorElement/errorElement";

export const appRouter = createBrowserRouter([
    {
        element: <Layout />,
        children: [...PublicRoutes, ...PrivateTrainerRoutes],
        errorElement: <ErrorElement />
    }
]);
