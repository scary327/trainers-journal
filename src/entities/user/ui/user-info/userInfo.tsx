import { Button, SlideOutMenu, Typography } from "@/shared/ui";
import * as styles from "./userInfo.module.css";

import AvatarSVG from "@/shared/icons/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { classnames } from "@/shared/lib";
import { setLoading } from "../../model/user.reducer";
import { IUser } from "../../model/user.types";
import { EditUserInfoContent } from "./editUserInfoContent/editUserInfoContent";

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

    const [openSlideOut, setOpenSlideOut] = useState<boolean>(false);

    const userFullName: string[] = [user.info.lastName, user.info.firstName, user.info.middleName];
    const userFullNameItems: string[] = ["Фамилия", "Имя", "Отчество"];
    const userAddData: string[] = [
        user.info.kyu.toString(),
        user.info.phoneNumber ?? "не указан",
        user.info.email ?? "не указан"
    ];
    const userAddDataItems: string[] = ["КЮ", "Телефон", "Почта"];

    const group: JSX.Element | null = user.roles.includes("Student") ? (
        <div className={styles.group}>
            <Typography variant="text_14_m">Группа РИ-1</Typography>
        </div>
    ) : null;

    const avatar: JSX.Element = !loading ? (
        <div>
            <AvatarSVG className={styles.avatar} />
        </div>
    ) : (
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
        <>
            <div className={styles.container}>
                <div className={styles.main_container}>
                    {avatar}
                    {userList}
                </div>
                <Button
                    variant="empty"
                    onClick={() => setOpenSlideOut(true)}
                    className={styles.button}
                >
                    Изменить
                </Button>
                {group}
            </div>
            <SlideOutMenu isOpen={openSlideOut} onClose={() => setOpenSlideOut(false)}>
                <EditUserInfoContent />
            </SlideOutMenu>
        </>
    );
};
