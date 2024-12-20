import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { IUser } from "../../model/user.types";

import * as styles from "./userData.module.css";
import { Button, Typography } from "@/shared/ui";

export const UserData = () => {
    const title = "Данные для входа";

    const user: IUser = useSelector((state: RootState) => state.user.user);
    const isAuthLoading: boolean = useSelector((state: RootState) => state.user.isAuthLoading);

    const content: JSX.Element = !isAuthLoading ? (
        <div className={styles.content}>
            <div>
                <Typography variant="text_14_r" className="text-gray-text">
                    Логин
                </Typography>
                <Typography variant="text_16_m">{user.userName}</Typography>
            </div>
            <div>
                <Typography variant="text_14_r" className="text-gray-text">
                    Пароль
                </Typography>
                <Typography variant="text_16_m">{"*".repeat(5)}</Typography>
            </div>
        </div>
    ) : (
        <div className="skeleton w-[200px] h-[80px] rounded-[20px] mb-[30px]" />
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
