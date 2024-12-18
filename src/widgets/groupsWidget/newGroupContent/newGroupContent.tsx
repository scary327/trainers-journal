import { AppDispatch, RootState } from "@/app/store";
import { Button, Input, Typography } from "@/shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as styles from "./newGroupContent.module.css";
import { postGroup } from "@/entities/api/services";

interface IForm {
    name: string;
    costPractice: number;
}

export const NewGroupContent = () => {
    const title: string = "Создание группы";

    const { register, handleSubmit, formState } = useForm<IForm>();
    const dispatch = useDispatch<AppDispatch>();
    const nameError = formState.errors["name"]?.message;
    const costError = formState.errors["costPractice"]?.message;
    const userName = useSelector((state: RootState) => state.user.user.userName);
    const onSubmit: SubmitHandler<IForm> = (data) => {
        dispatch(
            postGroup({
                userName: userName,
                name: data.name,
                costPractice: data.costPractice
            })
        );
    };

    return (
        <div className={styles.container}>
            <Typography variant="text_18_b">{title}</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input
                    {...register("name", { required: "Это поле обязательно!" })}
                    label="Имя группы"
                    isError={!!nameError}
                    helperText={nameError}
                />
                <Input
                    {...register("costPractice", {
                        required: "Это поле обязательно!",
                        min: {
                            value: 0,
                            message: "Цена не может быть меньше или равняться нулю"
                        }
                    })}
                    label="Цена за занятие"
                    type="number"
                    isError={!!costError}
                    helperText={costError}
                    min={0}
                />
                <Button type="submit">Создать</Button>
            </form>
        </div>
    );
};
