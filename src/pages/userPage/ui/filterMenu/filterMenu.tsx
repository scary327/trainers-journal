import { Button, Checkbox, Typography } from "@/shared/ui";
import * as styles from "./filterMenu.module.css";
import { DateInput } from "@/shared/ui/Fields";
import { memo, useState } from "react";
import { DateRange, IGroup } from "@/shared/types";
import { classList, genderList, Kyu } from "@/shared/constants";
import { classnames } from "@/shared/lib";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { filterStudents } from "@/entities/api/services";

export const FilterMenu = memo(() => {
    //фильтры на бэкенде делать

    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedKyu, setSelectedKyu] = useState<string[]>([]);
    const [selectedGender, setSelectedGender] = useState<string[]>([]);

    const [selectedDate, setSelectedDate] = useState<DateRange>({
        start: null,
        end: null
    });

    const formatDate = (date: Date) => date.toISOString().slice(0, 10);

    const dispatch = useDispatch<AppDispatch>();

    const userName = useSelector((state: RootState) => state.user.user.userName);

    const groups = useSelector((state: RootState) => state.groups.groups);
    const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);

    //   "classes": [
    //     0
    // ],
    // "startDateOfBirth": "2025-01-03",
    // "endDDateOfBirth": "2025-01-03",
    // "kyues": [
    //   0
    // ],
    // "genders": [
    //   0
    // ]

    const addOneDay = (date: Date): Date => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    };

    const handleSubmit = () => {
        const result = {
            classes:
                selectedClasses.length > 0
                    ? selectedClasses.map((item) => parseInt(item))
                    : classList.map((item) => parseInt(item.id)),
            startDateOfBirth: selectedDate.start
                ? formatDate(addOneDay(selectedDate.start!))
                : "1950-01-01",
            endDateOfBirth: selectedDate.end
                ? formatDate(addOneDay(selectedDate.end!))
                : "2077-01-01",
            kyues:
                selectedKyu.length > 0
                    ? selectedKyu.map((item) => parseInt(item))
                    : Kyu.map((item) => parseInt(item.id)),
            genders:
                selectedGender.length > 0
                    ? selectedGender.map((item) => parseInt(item))
                    : genderList.map((item) => parseInt(item.id)),
            groupsIds:
                selectedGroups.length > 0
                    ? selectedGroups.map((item) => item.id)
                    : groups.map((item) => item.id)
        };
        dispatch(filterStudents({ trainerName: userName, ...result }));
    };

    const toggleSelection = (key: string, id: string) => {
        switch (key) {
            case "class":
                setSelectedClasses((prev) =>
                    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
                );
                break;
            case "kyu":
                setSelectedKyu((prev) =>
                    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
                );
                break;
            case "gender":
                setSelectedGender((prev) =>
                    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
                );
                break;
        }
    };

    return (
        <div className={classnames(styles.container, "scrollbar-webkit")}>
            <Typography variant="text_16_b">Фильтры</Typography>
            <div className={styles.main}>
                <div className={styles.section}>
                    <Typography variant="text_14_b">Класс</Typography>
                    <div className={classnames(styles.list, "scrollbar-webkit")}>
                        {classList.map((item) => (
                            <div key={item.id} className={styles.check_row}>
                                <Checkbox
                                    check={selectedClasses.includes(item.id)}
                                    setCheck={() => toggleSelection("class", item.id)}
                                />
                                <Typography variant="text_14_r">{item.title}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
                <DateInput
                    label="Дата рождения"
                    selectedRange={selectedDate}
                    setSelectedRange={setSelectedDate}
                    className="w-full"
                />
                <div className={styles.section}>
                    <Typography variant="text_14_b">КЮ</Typography>
                    <div className={classnames(styles.list, "scrollbar-webkit")}>
                        {Kyu.map((item) => (
                            <div key={item.id} className={styles.check_row}>
                                <Checkbox
                                    check={selectedKyu.includes(item.id)}
                                    setCheck={() => toggleSelection("kyu", item.id)}
                                />
                                <Typography variant="text_14_r">{item.title}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.section}>
                    <Typography variant="text_14_b">Пол</Typography>
                    <div className={classnames(styles.list, "scrollbar-webkit")}>
                        {genderList.map((item) => (
                            <div className={styles.check_row}>
                                <Checkbox
                                    check={selectedGender.includes(item.id)}
                                    setCheck={() => toggleSelection("gender", item.id)}
                                />
                                <Typography variant="text_14_r">{item.title}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.section}>
                    <Typography variant="text_14_b">Группы</Typography>
                    <div className={classnames(styles.list, "scrollbar-webkit")}>
                        {groups.map((item) => (
                            <div className={styles.check_row}>
                                <Checkbox
                                    check={selectedGroups.includes(item)}
                                    setCheck={() =>
                                        setSelectedGroups((prev) =>
                                            prev.includes(item)
                                                ? prev.filter((group) => group !== item)
                                                : [...prev, item]
                                        )
                                    }
                                />
                                <Typography variant="text_14_r">{item.name}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button variant="primary" className="w-[60%]" type="button" onClick={handleSubmit}>
                Применить
            </Button>
        </div>
    );
});
