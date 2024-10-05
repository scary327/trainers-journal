import { FC } from "react";

interface IProvider {
    children: JSX.Element;
}

export const Providers: FC<IProvider> = ({ children }) => {
    return <>{children}</>;
};
