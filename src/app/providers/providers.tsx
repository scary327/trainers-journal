import { FC } from "react";
import { Provider } from "react-redux";
import { mainStore } from "../store";

interface IProvider {
    children: JSX.Element;
}

export const Providers: FC<IProvider> = ({ children }: IProvider) => {
    return <Provider store={mainStore}>{children}</Provider>;
};
