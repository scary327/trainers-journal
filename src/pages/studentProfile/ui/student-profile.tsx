import { PageTitle } from "@/shared/ui";
import * as styles from "./student-profile.module.css";
import { UserInfo } from "@/entities";

export const StudentProfile = () => {
    const title: string = "Личный кабинет";

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UserInfo />
            </div>
        </div>
    );
};
