import { PageTitle, SlideOutMenu } from "@/shared/ui";
import * as styles from "./userPage.module.css";
import { IStudent, UsersTable } from "@/widgets";
import { useEffect, useState } from "react";
import { SlideOutContent } from "./slideOutContent/slideOutContent";
import { FilterMenu } from "./filterMenu/filterMenu";
import { getGroups } from "@/entities/api/services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";

export const UserPage = () => {
    const title: string = "Пользователи";
    const dispatch = useDispatch<AppDispatch>();
    const userName = useSelector((state: RootState) => state.user.user.userName);

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    const [slideOutContent, setSlideOutContent] = useState<JSX.Element>(
        <SlideOutContent student={null} />
    );

    useEffect(() => {
        if (!slideOutOpen) setSlideOutContent(<></>);
    }, [slideOutOpen]);

    useEffect(() => {
        dispatch(getGroups(userName));
    }, [dispatch]);

    return (
        <div>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <UsersTable
                    openFilter={() => {
                        setSlideOutContent(<FilterMenu />); // Устанавливаем контент фильтра
                        setSlideOutOpen(true); // Открываем слайд-аут
                    }}
                    openEdit={(student: IStudent | null) => {
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
