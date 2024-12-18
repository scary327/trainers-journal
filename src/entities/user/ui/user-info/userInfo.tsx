import { Button, Typography } from "@/shared/ui";
import * as styles from "./userInfo.module.css";

//import AvatarSVG from "@/shared/icons/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { classnames } from "@/shared/lib";
import { setLoading } from "../../model/user.reducer";
import { IUser } from "../../model/user.types";

export const UserInfo = () => {
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

    const userFullName: string[] = [user.info.lastName, user.info.firstName, user.info.middleName];
    const userFullNameItems: string[] = ["Фамилия", "Имя", "Отчество"];
    const userAddData: string[] = [
        user.info.kyu.toString(),
        user.info.phoneNumber,
        user.info.email
    ];
    const userAddDataItems: string[] = ["КЮ", "Телефон", "Почта"];

    const group: JSX.Element | null = user.roles.includes("student") ? (
        <div className={styles.group}>
            <Typography variant="text_14_m">Группа РИ-1</Typography>
        </div>
    ) : null;

    const avatar: JSX.Element = (
        // !loading ? (
        //     <div>
        //         {user.avatar ? (
        //             <img src={user.avatar} className={styles.avatar} />
        //         ) : (
        //             <AvatarSVG className={styles.avatar} />
        //         )}
        //     </div>
        // ) :
        <div className="skeleton w-[124px] h-[124px] rounded-full" />
    );

    const userList: JSX.Element = !loading ? (
        <>
            <ul className={styles.list}>
                {userFullName.map((item, index) => (
                    <li key={index} className={styles.list_item}>
                        <span className={styles.item_title}>{userFullNameItems[index]}</span>
                        <span className={styles.item_value}>{item}</span>
                    </li>
                ))}
            </ul>
            <ul className={styles.list}>
                {userAddData.map((item, index: number) => (
                    <li key={index} className={styles.list_item}>
                        <span className={styles.item_title}>{userAddDataItems[index]}</span>
                        <span className={styles.item_value}>{item}</span>
                    </li>
                ))}
            </ul>
        </>
    ) : (
        <div className={classnames("skeleton", "w-[300px] h-[150px] rounded-xl")} />
    );

    return (
        <div className={styles.container}>
            <div className={styles.main_container}>
                {avatar}
                {userList}
            </div>
            <Button variant="empty" className={styles.button}>
                Изменить
            </Button>
            {group}
        </div>
    );
};
