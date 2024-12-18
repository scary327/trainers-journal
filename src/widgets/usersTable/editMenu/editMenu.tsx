import { classnames } from "@/shared/lib";
import { Typography, Select, Button, Input } from "@/shared/ui";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as styles from "./editMenu.module.css";
import { IStudents } from "../usersTable";

interface IRegisterForm {
    surname: string;
    name: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    kyu: string;
    gender: string;
    password: string;
}

interface IEditMenuProps {
    student: IStudents;
}

export const EditMenu = ({ student }: IEditMenuProps) => {
    const slideOutTitle: string = "Редактирование пользователя";
    console.log(student);

    const [kyuValue, setKyuValue] = useState<string>("");
    const [genderValue, setGenderValue] = useState<string>("");
    const inputItems = {
        surname: "Фамилия",
        name: "Имя",
        patronymic: "Отчество",
        phoneNumber: "Телефон",
        email: "Почта"
    };
    const selectItems = [
        {
            title: "КЮ",
            options: [
                { value: "6", label: "6" },
                { value: "5", label: "5" },
                { value: "4", label: "4" },
                { value: "3", label: "3" },
                { value: "2", label: "2" },
                { value: "1", label: "1" },
                { value: "No", label: "Нет" }
            ],
            value: kyuValue
        },
        {
            title: "Пол",
            options: [
                { value: "male", label: "Мужской" },
                { value: "female", label: "Женский" }
            ],
            value: genderValue
        }
    ];

    const { register, handleSubmit, reset } = useForm<IRegisterForm>();

    const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <>
            <Typography variant="text_16_b">{slideOutTitle}</Typography>
            <form
                className={classnames(styles.form_container, "scrollbar-webkit")}
                onSubmit={handleSubmit(onSubmit)}
            >
                {Object.keys(inputItems).map((item: keyof typeof inputItems) => (
                    <Input
                        className="w-full"
                        key={item}
                        type="text"
                        label={inputItems[item]}
                        {...register(item)}
                    />
                ))}
                {selectItems.map((item) => (
                    <Select
                        key={item.title}
                        label={item.title}
                        options={item.options}
                        value={item.value}
                        {...register(item.title === "КЮ" ? "kyu" : "gender")}
                        onChange={function (value: string): void {
                            switch (item.title) {
                                case "КЮ":
                                    setKyuValue(value);
                                    break;
                                case "Пол":
                                    setGenderValue(value);
                                    break;
                            }
                        }}
                    />
                ))}
                <Input
                    type="password"
                    className="w-full"
                    label="Пароль"
                    {...register("password")}
                />
                <Button variant="primary" className="w-[80%]" type="submit">
                    Зарегистрировать
                </Button>
            </form>
        </>
    );
};
