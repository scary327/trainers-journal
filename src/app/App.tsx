import { RouterProvider } from "react-router-dom";
import { Providers } from "@/app/providers/index";
import { appRouter } from "@/app/routers/app.router";

export const App = () => {
    return (
        <Providers>
            <RouterProvider router={appRouter} />
        </Providers>
    );
};
