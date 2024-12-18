import { classnames, formatUserName } from "@/shared/lib";
import * as styles from "./header.module.css";
import { Link } from "react-router-dom";
import { URLS } from "@/app/routers/app.urls";
import { Button, Typography } from "@/shared/ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { clearUser } from "@/entities/user/model/user.reducer";

export const Header = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const userParsedName = formatUserName(user.info);
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const navigateList = [
        {
            name: "Пользователи",
            path: URLS.USERS
        },
        {
            name: "Группы",
            path: URLS.GROUPS
        },
        {
            name: "Календарь",
            path: URLS.CALENDAR
        }
    ];

    const logout = () => {
        dispatch(clearUser());
    };

    return (
        <header className={classnames(styles.header_container, "gradient")}>
            <div className="flex items-center gap-x-14">
                <Typography variant="text_24_b">TJ</Typography>
                <ul className={styles.header_list}>
                    {navigateList.map((item) => (
                        <Link
                            className={classnames(styles.header_link, "hover-underline-animation")}
                            to={item.path}
                            draggable="false"
                            key={item.name}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className={styles.header_user}>
                {isAuth ? (
                    <>
                        <Link
                            className={classnames(styles.header_link, "hover-underline-animation")}
                            to={URLS.PROFILE}
                            draggable="false"
                        >
                            {userParsedName}
                        </Link>
                        <button
                            draggable="false"
                            onClick={() => logout()}
                            className={styles.header_logout}
                        >
                            выйти
                        </button>
                    </>
                ) : (
                    <div className="flex gap-x-[10px]">
                        <Button variant="primary">Войти</Button>
                        <Button variant="secondary">Регистрация</Button>
                    </div>
                )}
            </div>
        </header>
    );
};
