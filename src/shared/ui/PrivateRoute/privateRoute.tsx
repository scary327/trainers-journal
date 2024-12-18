import { URLS } from "@/app/routers/app.urls";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    currentRole: "trainer" | "student";
    children: JSX.Element;
}

export const PrivateRoute = ({ currentRole, children }: PrivateRouteProps) => {
    const user = useSelector((state: RootState) => state.user);

    return user.user.role === currentRole && user.isAuth ? children : <Navigate to={URLS.LOGIN} />;
};
