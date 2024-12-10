import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "../../model/user.types";

import * as styles from "./userData.module.css";
import { Button, Typography } from "@/shared/ui";
import { useEffect } from "react";
import { setLoading } from "../../model/user.reducer";

export const UserData = () => {
    const title = "Данные для входа";

    const user: IUser = useSelector((state: RootState) => state.user.user);
    const loading: boolean = useSelector((state: RootState) => state.user.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            dispatch(setLoading(true));
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
        };

        fetchUser();
    }, [dispatch]);

    const content: JSX.Element = !loading ? (
        <div className={styles.content}>
            <div>
                <Typography variant="text_14_r" className="text-gray-text">
                    Логин
                </Typography>
                <Typography variant="text_16_m">{user.login}</Typography>
            </div>
            <div>
                <Typography variant="text_14_r" className="text-gray-text">
                    Пароль
                </Typography>
                <Typography variant="text_16_m">{"*".repeat(user.password.length)}</Typography>
            </div>
        </div>
    ) : (
        <div className="skeleton w-[300px] h-[80px] rounded-[20px] mb-[30px]" />
    );

    return (
        <div className={styles.container}>
            <Typography variant="text_16_b" className="text-blue-dark">
                {title}
            </Typography>
            {content}
            <Button className="absolute right-0 bottom-0" variant="empty">
                Изменить
            </Button>
        </div>
    );
};
