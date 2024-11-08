import { PageTitle } from "@/shared/ui";
import * as styles from "./userPage.module.css";
import { SlideOutMenu, UsersTable } from "@/widgets";
import { useState } from "react";

export const UserPage = () => {
    const title: string = "Пользователи";

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UsersTable openSlideOut={() => setSlideOutOpen(true)} />
            </div>
            <SlideOutMenu isOpen={slideOutOpen} onClose={() => setSlideOutOpen(false)} />
        </div>
    );
};
