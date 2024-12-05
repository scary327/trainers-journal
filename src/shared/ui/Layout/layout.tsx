import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import * as styles from "./layout.module.css";
import { Header } from "@/widgets";
import { URLS } from "@/app/routers/app.urls";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setUser } from "@/entities/user/model/user.reducer";
import { IUser } from "@/entities/user/model/user.types";

export const Loader = () => {
    return (
        <>
            <div className={styles.loader} />
        </>
    );
};

export const Layout = () => {
    const location = useLocation();
    const isLogin = location.pathname === URLS.LOGIN;

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    useEffect(() => {
        //изменить на !user
        if (false) {
            navigate(URLS.LOGIN);
        }
    }, [user, navigate]);

    return (
        <Suspense
            fallback={
                <div className={styles.loader_container}>
                    <Loader />
                </div>
            }
        >
            {!isLogin && <Header />}
            <Outlet />
        </Suspense>
    );
};
