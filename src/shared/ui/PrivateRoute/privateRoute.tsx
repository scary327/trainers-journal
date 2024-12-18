import { URLS } from "@/app/routers/app.urls";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    currentRole: "Trainer" | "Student";
    children: JSX.Element;
}

export const PrivateRoute = ({ currentRole, children }: PrivateRouteProps) => {
    const user = useSelector((state: RootState) => state.user);

    return user.user.roles.includes(currentRole) && user.isAuth ? (
        children
    ) : (
        <Navigate to={URLS.LOGIN} />
    );
};
