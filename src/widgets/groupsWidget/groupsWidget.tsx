import { Button, Search, SlideOutMenu, Typography } from "@/shared/ui";
import * as styles from "./groupsWidget.module.css";
import { classnames } from "@/shared/lib";
import { IGroup } from "@/shared/types";
import { useState } from "react";
import { NewGroupContent } from "./newGroupContent/newGroupContent";
import { deleteGroup } from "@/entities/api/services";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";

interface GroupsWidgetProps {
    groupList: IGroup[];
}

export const GroupsWidget = ({ groupList }: GroupsWidgetProps) => {
    const buttonDesc = "Создать группу";

    const tableHeader = ["Номер группы", "Цена", "Участника", "", ""];

    const [openSlideOut, setOpenSlideOut] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteGroup = (id: string) => {
        dispatch(deleteGroup(id));
    };

    return (
        <>
            <div className={styles.container}>
                <div className="flex justify-between items-center">
                    <Search />
                    <Button onClick={() => setOpenSlideOut(true)}>{buttonDesc}</Button>
                </div>
                <div className={styles.table}>
                    <div className={classnames(styles.table_row, "text-gray-text border-none")}>
                        {tableHeader.map((item, index) => (
                            <Typography variant="text_14_r" key={index}>
                                {item}
                            </Typography>
                        ))}
                    </div>
                    {groupList.map((item) => (
                        <div className={styles.table_row} key={item.id}>
                            <Typography variant="text_14_m">{item.name}</Typography>
                            <Typography variant="text_14_m">{item.costPractice}</Typography>
                            <Typography variant="text_14_m">{item.numberStudents}</Typography>
                            <Button className="max-w-[150px]" variant="primary-small">
                                Редактировать
                            </Button>
                            <Button
                                onClick={() => handleDeleteGroup(item.id)}
                                className="max-w-[150px]"
                                variant="cancel"
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <SlideOutMenu isOpen={openSlideOut} onClose={() => setOpenSlideOut(false)}>
                <NewGroupContent />
            </SlideOutMenu>
        </>
    );
};
