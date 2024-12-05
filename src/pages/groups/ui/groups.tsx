import { PageTitle } from "@/shared/ui";
import * as styles from "./groups.module.css";
import { GroupsWidget } from "@/widgets";

interface IStudent {
    name: string;
    kyu: number;
}

export interface IGroup {
    name: string;
    price: number;
    students: IStudent[];
}

export const Groups = () => {
    const title = "Группы";

    const groupList = [
        {
            name: "Группа 1",
            price: 1000,
            students: [{ name: "Иван Иванов", kyu: 6 }]
        },
        {
            name: "Группа 2",
            price: 2000,
            students: [{ name: "Петр Петров", kyu: 7 }]
        }
    ];

    return (
        <div>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                <GroupsWidget groupList={groupList} />
            </div>
        </div>
    );
};
