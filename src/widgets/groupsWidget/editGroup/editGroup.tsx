import { Button, Input, Typography } from "@/shared/ui";
import * as styles from "./editGroup.module.css";
import { IGroup } from "@/shared/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getGroups, putGroup } from "@/entities/api/services";

interface IEditGroupProps {
    group: IGroup;
}

interface IForm {
    name: string;
    costPractice: number;
}

export const EditGroup = ({ group }: IEditGroupProps) => {
    const { register, handleSubmit, formState, reset } = useForm<IForm>({
        mode: "onChange"
    });
    useEffect(() => {
        reset({
            name: group.name,
            costPractice: group.costPractice
        });
    }, [group, reset]);
    const nameError = formState.errors["name"]?.message;
    const costError = formState.errors["costPractice"]?.message;

    const userName = useSelector((state: RootState) => state.user.user.userName);

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<IForm> = (data) => {
        dispatch(
            putGroup({
                id: group.id,
                name: data.name,
                costPractice: data.costPractice
            })
        ).then(() => {
            dispatch(getGroups(userName));
        });
    };

    return (
        <div className={styles.container}>
            <Typography variant="text_18_b">Изменить группу</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input
                    {...register("name", { required: "Это поле обязательно!" })}
                    type="text"
                    label="Имя группы"
                    isError={!!nameError}
                    helperText={nameError}
                    defaultValue={group.name}
                />
                <Input
                    {...register("costPractice", {
                        required: "Это поле обязательно!",
                        min: {
                            value: 0,
                            message: "Значение должно быть больше 0"
                        }
                    })}
                    type="number"
                    min={0}
                    label="Стоимость занятия"
                    isError={!!costError}
                    helperText={costError}
                    defaultValue={group.costPractice}
                />
                <Button type="submit">Сохранить</Button>
            </form>
        </div>
    );
};
