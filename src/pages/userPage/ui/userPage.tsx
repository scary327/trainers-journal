import { PageTitle, SlideOutMenu } from "@/shared/ui";
import * as styles from "./userPage.module.css";
import { UsersTable } from "@/widgets";
import { useState } from "react";
import { SlideOutContent } from "./slideOutContent/slideOutContent";

export const UserPage = () => {
    const title: string = "Пользователи";

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    return (
        <div>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UsersTable openSlideOut={() => setSlideOutOpen(true)} />
            </div>
            <SlideOutMenu isOpen={slideOutOpen} onClose={() => setSlideOutOpen(false)}>
                <SlideOutContent />
            </SlideOutMenu>
        </div>
    );
};
