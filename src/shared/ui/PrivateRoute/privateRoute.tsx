import { URLS } from "@/app/routers/app.urls";
import { AppDispatch, RootState } from "@/app/store";
import { tryGetUser } from "@/entities/user/model/user.reducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader } from "../Layout/layout";

interface PrivateRouteProps {
    currentRole: "Trainer" | "Student";
    children: JSX.Element;
}

export const PrivateRoute = ({ currentRole, children }: PrivateRouteProps) => {
    const user = useSelector((state: RootState) => state.user);
    const isLoading = useSelector((state: RootState) => state.user.isAuthLoading);
    const [loading, setLoading] = useState<boolean>(true);
    const lc = localStorage.getItem("user");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!lc) return;
        const fetchUser = async () => {
            await dispatch(tryGetUser(lc));
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (isLoading && loading) {
        return <Loader />;
    }

    return user.user.roles.includes(currentRole) && user.isAuth ? (
        children
    ) : (
        <Navigate to={URLS.LOGIN} />
    );
};
