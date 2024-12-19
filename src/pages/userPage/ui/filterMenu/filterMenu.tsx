import { Button, Checkbox, Typography } from "@/shared/ui";
import * as styles from "./filterMenu.module.css";
import { DateInput } from "@/shared/ui/Fields";
import { memo, useState } from "react";
import { DateRange } from "@/shared/types";
import { classList, genderList, Kyu } from "@/shared/constants";
import { classnames } from "@/shared/lib";

export const FilterMenu = memo(() => {
    //фильтры на бэкенде делать

    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedKyu, setSelectedKyu] = useState<string[]>([]);
    const [selectedGender, setSelectedGender] = useState<string[]>([]);

    const [selectedDate, setSelectedDate] = useState<DateRange>({
        start: null,
        end: null
    });

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
            </div>
            <Button variant="primary" className="w-[60%]" type="submit">
                Применить
            </Button>
        </div>
    );
});
