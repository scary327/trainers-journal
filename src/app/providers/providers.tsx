import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface IProvider {
    children: JSX.Element;
}

export const Providers: FC<IProvider> = ({ children }) => {
    return <ErrorBoundary fallback={<div>Что-то пошло не так</div>}>{children}</ErrorBoundary>;
};
