import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import * as styles from "./layout.module.css";
import { Header } from "@/widgets";

export const Loader = () => {
    return (
        <>
            <div className={styles.loader} />
        </>
    );
};

export const Layout = () => (
    <Suspense
        fallback={
            <div className={styles.loader_container}>
                <Loader />
            </div>
        }
    >
        <Header />
        <Outlet />
    </Suspense>
);
