import { PageTitle } from "@/shared/ui";

import * as styles from "./profile.module.css";
import { UserInfo } from "@/entities/";
import { PaymentHistory } from "@/features";

export const Profile = () => {
    const title: string = "Личный кабинет";

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UserInfo />
                <PaymentHistory />
            </div>
        </div>
    );
};
