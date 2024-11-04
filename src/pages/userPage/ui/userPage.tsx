import { PageTitle } from "@/shared/ui";
import * as styles from "./userPage.module.css";

export const UserPage = () => {
    const title: string = "Пользователи";

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
        </div>
    );
};
