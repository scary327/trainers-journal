import { PageTitle } from "@/shared/ui";

import * as styles from "./profile.module.css";
import { UserData, UserInfo } from "@/entities/";
import { PaymentHistory } from "@/features";

export const Profile = () => {
    const title: string = "Личный кабинет";

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
