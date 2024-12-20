import { Loader, Modal, PageTitle, SlideOutMenu, Typography } from "@/shared/ui";
import * as styles from "./userPage.module.css";
import { IStudent, UsersTable } from "@/widgets";
import { useEffect, useState } from "react";
import { SlideOutContent } from "./slideOutContent/slideOutContent";
import { FilterMenu } from "./filterMenu/filterMenu";
import { getGroups, getStudents } from "@/entities/api/services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { SecondContent } from "./secondContent/secondContent";

export const UserPage = () => {
    const title: string = "Пользователи";
    const dispatch = useDispatch<AppDispatch>();
    const userName = useSelector((state: RootState) => state.user.user.userName);
    const loading = useSelector((state: RootState) => state.students.isLoading);
    const loadingGroups = useSelector((state: RootState) => state.groups.isLoading);

    const authData = useSelector((state: RootState) => state.students.authData);
    const [authModal, setAuthModal] = useState<boolean>(false);

    const [slideOutOpen, setSlideOutOpen] = useState<boolean>(false);
    const [slideOutContent, setSlideOutContent] = useState<JSX.Element>(
        <SlideOutContent student={null} />
    );

    useEffect(() => {
        if (!slideOutOpen) setSlideOutContent(<></>);
    }, [slideOutOpen]);

    useEffect(() => {
        dispatch(getGroups(userName));
        dispatch(getStudents(userName));
    }, [dispatch]);

    const userTable =
        loading || loadingGroups ? (
            <div className="bg-white py-[30px] px-[80px] rounded-[20px]">
                <Loader />
            </div>
        ) : (
            <UsersTable
                openFilter={() => {
                    setSlideOutContent(<FilterMenu />); // Устанавливаем контент фильтра
                    setSlideOutOpen(true); // Открываем слайд-аут
                }}
                openEdit={(student: IStudent | null) => {
                    setSlideOutContent(
                        <SlideOutContent
                            student={student}
                            openContacts={(data: IStudent) => {
                                setSlideOutContent(
                                    <SecondContent
                                        form={data}
                                        setAuthModal={() => setAuthModal(true)}
                                    />
                                );
                                setSlideOutOpen(true);
                            }}
                        />
                    ); // Устанавливаем контент редактирования
                    setSlideOutOpen(true); // Открываем слайд-аут
                }}
            />
        );

    return (
        <>
            <div>
                <PageTitle title={title} />
                <div className={styles.main_container}>{userTable}</div>
                <SlideOutMenu isOpen={slideOutOpen} onClose={() => setSlideOutOpen(false)}>
                    {slideOutContent}
                </SlideOutMenu>
            </div>
            <Modal visible={authModal} onClose={() => setAuthModal(false)}>
                <div>
                    <Typography variant="text_18_b" className="text-blue-dark">
                        Данные для входа
                    </Typography>
                    <div>
                        <Typography variant="text_14_m" className="text-gray-text">
                            Логин
                        </Typography>
                        <Typography variant="text_14_b" className="text-black">
                            {authData?.userName}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="text_14_m" className="text-gray-text">
                            Пароль
                        </Typography>
                        <Typography variant="text_14_b" className="text-black">
                            {authData?.password}
                        </Typography>
                    </div>
                </div>
            </Modal>
        </>
    );
};
