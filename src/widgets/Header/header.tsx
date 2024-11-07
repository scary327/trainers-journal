import { classnames, formatUserName } from "@/shared/lib";
import * as styles from "./header.module.css";
import { Link } from "react-router-dom";
import { URLS } from "@/app/routers/app.urls";
import { Button } from "@/shared/ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { clearUser } from "@/entities/user/model/user.reducer";

export const Header = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const userParsedName = formatUserName(user.fullName);
    const dispatch = useDispatch();

    const navigateList = [
        {
            name: "Пользователи",
            path: URLS.USERS
        },
        {
            name: "Группы",
            path: "/"
        },
        {
            name: "Календарь",
            path: "/"
        }
    ];

    const logout = () => {
        dispatch(clearUser());
    };

    return (
        <header className={classnames(styles.header_container, "gradient")}>
            <div className="flex items-center gap-x-14">
                <Link to="/" draggable="false" className={styles.header_title}>
                    TJ
                </Link>
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
                {user.fullName ? (
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
