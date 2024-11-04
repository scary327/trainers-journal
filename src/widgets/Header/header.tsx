import { classnames } from "@/shared/lib";
import * as styles from "./header.module.css";
import { Link } from "react-router-dom";
import { URLS } from "@/app/routers/app.urls";

interface IUser {
    name: string;
    surname: string;
}

export const Header = () => {
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

    const user: IUser | undefined = {
        name: "Александр",
        surname: "Колосов"
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
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </div>
            <div className={styles.header_user}>
                {user ? (
                    <>
                        <Link
                            className={classnames(styles.header_link, "hover-underline-animation")}
                            to={URLS.PROFILE}
                            draggable="false"
                        >
                            {user.surname} {user.name.slice(0, 1)}.
                        </Link>
                        <Link draggable="false" className={styles.header_logout} to="/">
                            выйти
                        </Link>
                    </>
                ) : (
                    <>
                        <button>Войти</button>
                        <button>Регистрация</button>
                    </>
                )}
            </div>
        </header>
    );
};
