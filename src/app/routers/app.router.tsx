import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes } from "@/app/routers/app.routes";
import { Layout } from "@/shared";
import { ErrorElement } from "@/app/routers/errorElement/errorElement";

export const appRouter = createBrowserRouter([
    {
        element: <Layout />,
        children: PublicRoutes,
        errorElement: <ErrorElement />
    }
]);
