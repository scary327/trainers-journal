import { PageTitle } from "@/shared/ui";
import * as styles from "./profile.module.css";
import { UserData, UserInfo } from "@/entities/";
import { PaymentHistory } from "@/features";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "@/entities/api/services";
import { AppDispatch, RootState } from "@/app/store";

export const Profile = () => {
    const title: string = "Личный кабинет";

    const dispatch = useDispatch<AppDispatch>();
    const userName: string = useSelector((state: RootState) => state.user.user.userName);

    useEffect(() => {
        dispatch(getUserInfo({ userName }));
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <div className={styles.userinfo_container}>
                    <UserInfo />
                    <UserData />
                </div>
                <PaymentHistory />
            </div>
        </div>
    );
};
