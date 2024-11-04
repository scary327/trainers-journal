import { RouterProvider } from "react-router-dom";
import { appRouter } from "@/app/routers/app.router";
import { Providers } from "./providers";
import "./styles/global.css";

export const App = () => {
    return (
        <Providers>
            <RouterProvider router={appRouter} />
        </Providers>
    );
};
