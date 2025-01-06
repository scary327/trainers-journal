import { classnames } from "@/shared/lib";
import { Typography, Select, Button, Input, DateInput } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as styles from "./slideOutContent.module.css";
import { IContact, IStudent } from "@/widgets";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, putStudent } from "@/entities/api/services";
import { DateRange } from "@/shared/types";

export interface IRegisterForm {
    lastName: string;
    firstName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    kyu: number;
    gender: number;
    password: string;
    group: string;
    address: string;
    class: number;
}

interface IEditMenuProps {
    student: IStudent | null;
    openContacts?: (data: IStudent) => void;
}

export const SlideOutContent = ({ student, openContacts }: IEditMenuProps) => {
    const slideOutTitle: string = student
        ? "Редактирование пользователя"
        : "Регистрация пользователя";
    const buttonTitle: string = student ? "Сохранить" : "Зарегистрировать";
    const dispatch = useDispatch<AppDispatch>();
    const [kyuValue, setKyuValue] = useState<string>("");
    const [genderValue, setGenderValue] = useState<string>("");
    const [groupValue, setGroupValue] = useState<string>("");

    const groupsOptions = useSelector((state: RootState) =>
        state.groups.groups.map((group) => ({
            value: group.id,
            label: group.name
        }))
    );

    const inputItems = {
        lastName: "Фамилия*",
        firstName: "Имя*",
        middleName: "Отчество*",
        address: "Адрес",
        class: "Класс*",
        phoneNumber: "Телефон",
        email: "Почта"
    };
    const selectItems = [
        {
            title: "Группа",
            options: groupsOptions,
            value: groupValue
        },
        {
            title: "КЮ",
            options: [
                { value: "6", label: "6" },
                { value: "5", label: "5" },
                { value: "4", label: "4" },
                { value: "3", label: "3" },
                { value: "2", label: "2" },
                { value: "1", label: "1" },
                { value: "0", label: "0" }
            ],
            value: kyuValue
        },
        {
            title: "Пол",
            options: [
                { value: "1", label: "Мужской" },
                { value: "0", label: "Женский" }
            ],
            value: genderValue
        }
    ];

    const addOneDay = (date: Date): Date => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    };

    const { register, handleSubmit, reset, formState } = useForm<IRegisterForm>();

    useEffect(() => {
        if (student) {
            // Если student существует, обновляем значения формы
            setKyuValue(student.studentInfoItemDto.kyu.toString());
            setGenderValue(student.studentInfoItemDto.gender.toString());
        } else {
            // Если student отсутствует, сбрасываем форму
            setKyuValue("");
            setGenderValue("");
        }
    }, [student, reset]);

    const userName = useSelector((state: RootState) => state.user.user.userName);

    const handleEdit = (data: IRegisterForm) => {
        if (!student) return;
        dispatch(
            putStudent({
                userName: student?.studentInfoItemDto?.userName ?? "defaultUsername",
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    dateOfBirth: selectedDate.start
                        ? formatDate(addOneDay(selectedDate.start!))
                        : student.studentInfoItemDto.dateOfBirth,
                    kyu: Number(kyuValue),
                    class: data.class,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    gender: Number(genderValue)
                }
            })
        ).then(() => {
            dispatch(getStudents(userName));
        });
    };

    const formatDate = (date: Date) => date.toISOString().slice(0, 10);

    const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
        if (!student)
            openContacts?.({
                groupId: groupValue ? groupValue : groupsOptions[0].value,
                studentInfoItemDto: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    dateOfBirth: formatDate(addOneDay(selectedDate.start!)),
                    kyu: Number(kyuValue),
                    class: data.class,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    gender: Number(genderValue)
                },
                contacts: [] as IContact[]
            } as IStudent);
        else handleEdit(data);

        reset();
    };

    const switchTitle = (title: string) => {
        switch (title) {
            case "КЮ":
                return "kyu";
            case "Пол":
                return "gender";
            case "Группа":
                return "group";
            default:
                return "kyu";
        }
    };

    const [selectedDate, setSelectedDate] = useState<DateRange>({
        start: null,
        end: null
    });

    return (
        <>
            <Typography variant="text_16_b">{slideOutTitle}</Typography>
            <form
                className={classnames(styles.form_container, "scrollbar-webkit")}
                onSubmit={handleSubmit(onSubmit)}
            >
                {Object.keys(inputItems).map((item: keyof typeof inputItems) => {
                    const errors = formState.errors[item];
                    const isRequired = ["lastName", "firstName", "middleName", "class"].includes(
                        item
                    );
                    const isClass = item === "class";

                    return (
                        <Input
                            className="w-full"
                            key={item}
                            type="text"
                            label={inputItems[item]}
                            {...register(item, {
                                ...(isRequired && { required: "Это поле обязательно" }),
                                ...(isClass && {
                                    pattern: {
                                        value: /^[1-9]$|^10$|^11$/,
                                        message: "Введите число от 1 до 11"
                                    }
                                })
                            })}
                            isError={!!errors}
                            helperText={errors?.message}
                            defaultValue={student?.studentInfoItemDto[item] || ""}
                        />
                    );
                })}
                <div className="self-start z-50">
                    <DateInput
                        selectedRange={selectedDate}
                        setSelectedRange={setSelectedDate}
                        onlyOneDate={true}
                        label="Дата рождения*"
                    />
                </div>
                {selectItems.map((item) => (
                    <Select
                        key={item.title}
                        label={item.title}
                        options={item.options}
                        value={item.value}
                        {...register(switchTitle(item.title))}
                        onChange={function (value: string): void {
                            switch (item.title) {
                                case "КЮ":
                                    setKyuValue(value);
                                    break;
                                case "Пол":
                                    setGenderValue(value);
                                    break;
                                case "Группа":
                                    setGroupValue(value);
                                    break;
                            }
                        }}
                    />
                ))}
                <Button variant="primary" className="w-[80%]" type="submit">
                    {buttonTitle}
                </Button>
            </form>
        </>
    );
};
