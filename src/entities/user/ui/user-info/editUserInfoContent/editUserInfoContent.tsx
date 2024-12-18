import { AppDispatch, RootState } from "@/app/store";
import { Button, Input, Typography } from "@/shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as styles from "./newGroupContent.module.css";
import { IUserInfo } from "@/entities/user/model/user.types";
import { putUserInfo } from "@/entities/api/services/putUserInfo";

export const EditUserInfoContent = () => {
    const title: string = "Редактирование профиля";

    const { register, handleSubmit, formState } = useForm<IUserInfo>();
    const dispatch = useDispatch<AppDispatch>();
    const firstNameError = formState.errors["firstName"]?.message;
    const lastNameError = formState.errors["lastName"]?.message;
    const midNameError = formState.errors["middleName"]?.message;
    const userName = useSelector((state: RootState) => state.user.user.userName);
    const onSubmit: SubmitHandler<IUserInfo> = (data) => {
        dispatch(
            putUserInfo({
                userName: userName,
                info: data,
                roles: [],
                token: ""
            })
        );
    };

    return (
        <div className={styles.container}>
            <Typography variant="text_18_b">{title}</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Input
                    {...register("lastName", {
                        required: "Это поле обязательно!"
                    })}
                    label="Фамилия"
                    isError={!!lastNameError}
                    helperText={lastNameError}
                />
                <Input
                    {...register("firstName", { required: "Это поле обязательно!" })}
                    label="Имя"
                    isError={!!firstNameError}
                    helperText={firstNameError}
                />

                <Input
                    {...register("middleName", {
                        required: "Это поле обязательно!"
                    })}
                    label="Отчество"
                    isError={!!midNameError}
                    helperText={midNameError}
                />
                <Input
                    {...register("kyu", {
                        required: "Это поле обязательно!"
                    })}
                    label="Кю"
                />
                <Input
                    {...register("phoneNumber", {
                        required: "Это поле обязательно!"
                    })}
                    label="Телефон"
                />
                <Input
                    {...register("email", {
                        required: "Это поле обязательно!"
                    })}
                    label="Почта"
                />
                <Button type="submit">Сохранить</Button>
            </form>
        </div>
    );
};
