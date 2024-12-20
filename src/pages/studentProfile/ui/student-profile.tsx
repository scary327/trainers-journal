import { Loader, PageTitle } from "@/shared/ui";
import * as styles from "./student-profile.module.css";
import { UserContacts, UserData, UserInfo } from "@/entities";
import { PaymentHistory } from "@/features";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { getStudentInfo } from "@/entities/api/services";

export const StudentProfile = () => {
    const title: string = "Личный кабинет";

    const userName = useSelector((state: RootState) => state.user.user.userName);
    const infoLoading = useSelector((state: RootState) => state.user.isInfoLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getStudentInfo(userName));
    }, [dispatch]);

    if (infoLoading) return <Loader />;

    return (
        <div>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <div className={styles.center_container}>
                    <UserInfo />
                    <div className="flex justify-between gap-x-[30px] items-center w-full">
                        <UserData />
                        <UserContacts />
                    </div>
                </div>
                <div className="w-[65%]">
                    <PaymentHistory />
                </div>
            </div>
        </div>
    );
};
