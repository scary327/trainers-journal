import { RouterProvider } from "react-router-dom";
import { appRouter } from "@/app/routers/app.router";
import { Providers } from "./providers";
import "./styles/global.css";
import { IUser } from "@/entities/user/model/user.types";

export const App = () => {
    const user: IUser = {
        fullName: "Колосов Александр Константинович",
        email: "loh1@example.com",
        kyu: 6,
        phoneNumber: "79031234567",
        avatar: ""
    };
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    return (
        <Providers>
            <RouterProvider router={appRouter} />
        </Providers>
    );
};
