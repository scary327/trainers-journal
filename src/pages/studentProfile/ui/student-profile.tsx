import { PageTitle } from "@/shared/ui";
import * as styles from "./student-profile.module.css";
import { UserContacts, UserData, UserInfo } from "@/entities";
import { PaymentHistory } from "@/features";

export const StudentProfile = () => {
    const title: string = "Личный кабинет";

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
