import { classnames } from "@/shared/lib";
import { Typography, Select, Button, Input, Modal } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as styles from "./slideOutContent.module.css";
import { IContact, IStudent } from "@/widgets";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, postStudent, putStudent } from "@/entities/api/services";

interface IRegisterForm {
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
}

export const SlideOutContent = ({ student }: IEditMenuProps) => {
    const slideOutTitle: string = student
        ? "Редактирование пользователя"
        : "Регистрация пользователя";
    const buttonTitle: string = student ? "Сохранить" : "Зарегистрировать";
    const dispatch = useDispatch<AppDispatch>();
    const [kyuValue, setKyuValue] = useState<string>("");
    const [genderValue, setGenderValue] = useState<string>("");
    const [groupValue, setGroupValue] = useState<string>("");

    //const [optionsValue, setOptionsValue] = useState<{ value: string; label: string }>("");

    // [
    //     {
    //       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //       "name": "string",
    //       "costPractice": 0,
    //       "numberStudents": 0
    //     }
    //   ]

    const groupsOptions = useSelector((state: RootState) =>
        state.groups.groups.map((group) => ({
            value: group.id,
            label: group.name
        }))
    );

    const inputItems = {
        lastName: "Фамилия",
        firstName: "Имя",
        middleName: "Отчество",
        address: "Адресс",
        class: "Класс",
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

    const { register, handleSubmit, reset } = useForm<IRegisterForm>();

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
    const authData = useSelector((state: RootState) => state.students.authData);
    const [authModal, setAuthModal] = useState<boolean>(false);

    const handleCreate = (data: IRegisterForm) => {
        dispatch(
            postStudent({
                groupId: groupValue,
                studentInfoItemDto: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    dateOfBirth: "2024-05-19",
                    kyu: Number(kyuValue),
                    class: data.class,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    gender: Number(genderValue)
                },
                contacts: [] as IContact[]
            } as IStudent)
        ).then(() => {
            dispatch(getStudents(userName));
            setAuthModal(true);
        });
    };

    const handleEdit = (data: IRegisterForm) => {
        dispatch(
            putStudent({
                userName: student?.studentInfoItemDto?.userName ?? "defaultUsername",
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    dateOfBirth: "2024-05-19",
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

    const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
        if (!student) handleCreate(data);
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
                        type={item === "class" ? "number" : "text"}
                        min={1}
                        label={inputItems[item]}
                        {...register(item)}
                        defaultValue={student?.studentInfoItemDto[item] || ""}
                    />
                ))}
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
