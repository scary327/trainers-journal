import { Button, Search, Typography } from "@/shared/ui";
import * as styles from "./groupsWidget.module.css";
import { IGroup } from "@/pages/groups/ui/groups";
import { classnames } from "@/shared/lib";

interface GroupsWidgetProps {
    groupList: IGroup[];
}

export const GroupsWidget = ({ groupList }: GroupsWidgetProps) => {
    const buttonDesc = "Создать группу";

    const tableHeader = ["Номер группы", "Цена", "Участника", "", ""];

    return (
        <div className={styles.container}>
            <div className="flex justify-between items-center">
                <Search />
                <Button>{buttonDesc}</Button>
            </div>
            <div className={styles.table}>
                <div className={classnames(styles.table_row, "text-gray-text border-none")}>
                    {tableHeader.map((item, index) => (
                        <Typography variant="text_14_r" key={index}>
                            {item}
                        </Typography>
                    ))}
                </div>
                {groupList.map((item, index) => (
                    <div className={styles.table_row} key={index}>
                        <Typography variant="text_14_m">{item.name}</Typography>
                        <Typography variant="text_14_m">{item.price}</Typography>
                        <Typography variant="text_14_m">{item.students.length}</Typography>
                        <Button className="max-w-[150px]" variant="primary-small">
                            Редактировать
                        </Button>
                        <Button className="max-w-[150px]" variant="cancel">
                            Удалить
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
