import { Button, Input, Typography } from "@/shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
    getStudentContacts,
    getStudents,
    IGetContacts,
    postStudent,
    postStudentContacts,
    putStudentContacts
} from "@/entities/api/services";
import { IStudent } from "@/widgets";
import { useState } from "react";

interface IForm {
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    email: string;
    relation: string;
}
interface SecondContentProps {
    form?: IStudent;
    setAuthModal?: () => void;
    isEdit: boolean;
    isRegiseter: boolean;
    editContact?: IGetContacts;
}
export const SecondContent = ({
    form,
    setAuthModal,
    isEdit,
    editContact,
    isRegiseter
}: SecondContentProps) => {
    const { register, handleSubmit, reset } = useForm<IForm>();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.user.user);
    const [tempContacts, setTempContacts] = useState<IForm[]>([]);

    const addNew: SubmitHandler<IForm> = async (data) => {
        await setTempContacts((prev) => [...prev, data]);
        reset({
            firstName: "",
            lastName: "",
            middleName: "",
            phoneNumber: "",
            email: "",
            relation: ""
        });
    };

    return (
        <>
            <Typography variant="text_16_b">
                {" "}
                {!isEdit ? `Добавление контактов` : `Редактирование контактов`}
            </Typography>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(addNew)();
                }}
                className="flex flex-col gap-y-[30px] w-[80%] p-[10px] overflow-auto"
            >
                <Input
                    type="text"
                    {...register("relation")}
                    label="Отношение"
                    defaultValue={editContact?.contactItem.relation}
                />
                <Input
                    type="text"
                    {...register("lastName")}
                    label="Фамилия"
                    defaultValue={editContact?.contactItem.lastName}
                />
                <Input
                    type="text"
                    {...register("firstName")}
                    label="Имя"
                    defaultValue={editContact?.contactItem.firstName}
                />
                <Input
                    type="text"
                    {...register("middleName")}
                    label="Отчество"
                    defaultValue={editContact?.contactItem.middleName}
                />
                <Input
                    type="text"
                    {...register("email")}
                    label="Почта"
                    defaultValue={editContact?.contactItem.email}
                />
                <Input
                    type="text"
                    {...register("phoneNumber")}
                    label="Номер телефона"
                    defaultValue={editContact?.contactItem.phoneNumber}
                />

                {isEdit ? (
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => {
                            handleSubmit((data) => {
                                dispatch(
                                    putStudentContacts([
                                        { contactId: editContact!.contactId, contactItem: data }
                                    ])
                                ).then(() =>
                                    dispatch(
                                        getStudentContacts(
                                            user.roles.includes("Trainer")
                                                ? form!.studentInfoItemDto.userName!
                                                : user.userName
                                        )
                                    )
                                );
                            })();
                        }}
                    >
                        Сохранить
                    </Button>
                ) : (
                    <div className="flex gap-x-[10px] justify-between">
                        <Button variant="primary" type="submit">
                            Добавить еще
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                handleSubmit((data) => {
                                    let updatedContacts = [...tempContacts, data];
                                    if (Object.values(data).every((value) => value === "")) {
                                        updatedContacts = [...tempContacts];
                                    }
                                    setTempContacts(updatedContacts);
                                    if (isRegiseter)
                                        dispatch(
                                            postStudent({ ...form!, contacts: updatedContacts })
                                        ).then(() => {
                                            dispatch(getStudents(user.userName));
                                            setAuthModal?.();
                                        });
                                    else
                                        dispatch(
                                            postStudentContacts({
                                                userName: user.roles.includes("Trainer")
                                                    ? form!.studentInfoItemDto.userName!
                                                    : user.userName,
                                                contacts: updatedContacts
                                            })
                                        ).then(() =>
                                            dispatch(
                                                getStudentContacts(
                                                    user.roles.includes("Trainer")
                                                        ? form!.studentInfoItemDto.userName!
                                                        : user.userName
                                                )
                                            )
                                        );
                                })();
                            }}
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </>
    );
};
