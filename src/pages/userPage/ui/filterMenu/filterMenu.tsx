import { Input, Typography } from "@/shared/ui";
import * as styles from "./filterMenu.module.css";

export const FilterMenu = () => {
    //фильтры на бэкенде
    return (
        <>
            <Typography variant="text_16_b">Фильтры</Typography>
            <div>
                <div>
                    <Typography variant="text_14_b">Класс</Typography>
                    <Input type="text" label="Найти" />
                </div>
                <Input type="date" label="Дата рождения" />
                <Typography variant="text_14_b">КЮ</Typography>
                <Typography variant="text_14_b">Пол</Typography>
                <Typography variant="text_14_b">Группа</Typography>
            </div>
        </>
    );
};
