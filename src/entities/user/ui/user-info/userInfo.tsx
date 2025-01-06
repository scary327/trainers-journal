import { Button, SlideOutMenu } from "@/shared/ui";
import * as styles from "./userInfo.module.css";

import AvatarSVG from "@/shared/icons/avatar.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { memo, useState } from "react";
import { classnames } from "@/shared/lib";
import { IUser } from "../../model/user.types";
import { EditUserInfoContent } from "./editUserInfoContent/editUserInfoContent";
import { SlideOutContent } from "@/pages/userPage/ui/slideOutContent/slideOutContent";
import { IStudent, IStudentInfo } from "@/widgets";

export const UserInfo = memo(() => {
    const user: IUser = useSelector((state: RootState) => state.user.user);
    const loading: boolean = useSelector((state: RootState) => state.user.isInfoLoading);

    const [openSlideOut, setOpenSlideOut] = useState<boolean>(false);

    const userFullName: string[] = [user.info.lastName, user.info.firstName, user.info.middleName];
    const userFullNameItems: string[] = ["Фамилия", "Имя", "Отчество"];
    const userAddData: string[] = [
        user.info.kyu.toString(),
        user.info.phoneNumber ?? "не указан",
        user.info.email ?? "не указан"
    ];
    const userAddDataItems: string[] = ["КЮ", "Телефон", "Почта"];

    const userGender = (() => {
        if (user.roles.includes("Trainer")) return "Не указан";
        switch (user.info.gender) {
            case 1:
                return "Мужской";
            case 0:
                return "Женский";
            default:
                return "Не указан";
        }
    })();

    const userStudentData: string[] = [
        user.info.address ?? "не указан",
        user.info.class?.toString() ?? "не указан",
        user.info.dateOfBirth?.toString() ?? "не указан"
    ];
    const userStudentDataItems: string[] = ["Адрес", "Класс", "Дата рождения"];

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
            {user.roles.includes("Student") ? (
                <>
                    <ul className={styles.list}>
                        {userStudentData.map((item, index: number) => (
                            <li key={index} className={styles.list_item}>
                                <span className={styles.item_title}>
                                    {userStudentDataItems[index]}
                                </span>
                                <span className={styles.item_value}>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <li className={classnames(styles.list_item, "self-start")}>
                        <span className={styles.item_title}>Пол</span>
                        <span className={styles.item_value}>{userGender}</span>
                    </li>
                </>
            ) : null}
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
            </div>
            <SlideOutMenu isOpen={openSlideOut} onClose={() => setOpenSlideOut(false)}>
                {user.roles.includes("Trainer") ? (
                    <EditUserInfoContent />
                ) : (
                    <SlideOutContent
                        student={
                            {
                                groupId: "defoultValue",
                                studentInfoItemDto: {
                                    userName: user.userName,
                                    ...(user.info as IStudentInfo)
                                }
                            } as IStudent
                        }
                    />
                )}
            </SlideOutMenu>
        </>
    );
});
