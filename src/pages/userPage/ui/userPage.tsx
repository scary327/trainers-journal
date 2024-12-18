import { PageTitle, SlideOutMenu } from "@/shared/ui";
import * as styles from "./userPage.module.css";
import { IStudents, UsersTable } from "@/widgets";
import { useState } from "react";
import { SlideOutContent } from "./slideOutContent/slideOutContent";
import { FilterMenu } from "./filterMenu/filterMenu";

export const UserPage = () => {
    const title: string = "Пользователи";

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    const [slideOutContent, setSlideOutContent] = useState<JSX.Element>(
        <SlideOutContent student={null} />
    );

    return (
        <div>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UsersTable
                    openFilter={() => {
                        setSlideOutContent(<FilterMenu />); // Устанавливаем контент фильтра
                        setSlideOutOpen(true); // Открываем слайд-аут
                    }}
                    openEdit={(student: IStudents | null) => {
                        setSlideOutContent(<SlideOutContent student={student} />); // Устанавливаем контент редактирования
                        setSlideOutOpen(true); // Открываем слайд-аут
                    }}
                />
            </div>
            <SlideOutMenu isOpen={slideOutOpen} onClose={() => setSlideOutOpen(false)}>
                {slideOutContent}
            </SlideOutMenu>
        </div>
    );
};
