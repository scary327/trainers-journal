import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import * as styles from "./layout.module.css";
import { Header } from "@/widgets";
import { URLS } from "@/app/routers/app.urls";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

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
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin && user.isAuth) navigate(URLS.PROFILE);
    }, []);

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
