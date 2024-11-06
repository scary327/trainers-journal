import { PageTitle } from "@/shared/ui";
import * as styles from "./userPage.module.css";
import { UsersTable } from "@/widgets";

export const UserPage = () => {
    const title: string = "Пользователи";

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UsersTable />
            </div>
        </div>
    );
};
