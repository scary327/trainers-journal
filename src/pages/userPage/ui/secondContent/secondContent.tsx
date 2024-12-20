import { Button, Input, Typography } from "@/shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getStudents, postStudent } from "@/entities/api/services";
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
    form: IStudent;
    setAuthModal?: () => void;
}
export const SecondContent = ({ form, setAuthModal }: SecondContentProps) => {
    const { register, handleSubmit, reset } = useForm<IForm>();
    const dispatch = useDispatch<AppDispatch>();

    const userName = useSelector((state: RootState) => state.user.user.userName);
    const [tempContacts, setTempContacts] = useState<IForm[]>([]);
    const handleCreate = () => {
        dispatch(postStudent({ ...form, contacts: tempContacts })).then(() => {
            dispatch(getStudents(userName));
            setAuthModal?.();
        });
    };

    const addNew: SubmitHandler<IForm> = (data) => {
        setTempContacts((prev) => [...prev, data]);
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
        <div className="flex flex-col gap-y-[30px] items-start">
            <Typography variant="text_18_b">Добавление контактов</Typography>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(addNew)();
                }}
            >
                <Input type="text" {...register("relation")} label="Отношение" />
                <Input type="text" {...register("lastName")} label="Фамилия" />
                <Input type="text" {...register("firstName")} label="Имя" />
                <Input type="text" {...register("middleName")} label="Отчество" />
                <Input type="text" {...register("email")} label="Почта" />
                <Input type="text" {...register("phoneNumber")} label="Номер телефона" />
                <div>
                    <Button variant="primary" type="submit">
                        Добавить еще
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                            handleSubmit(addNew)();
                            handleCreate();
                        }}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    );
};
