import { AppDispatch, RootState } from "@/app/store";
import { Button, Input, Typography } from "@/shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as styles from "./editUserInfo.module.css";
import { IUserInfo } from "@/entities/user/model/user.types";
import { putUserInfo } from "@/entities/api/services/putUserInfo";

export const EditUserInfoContent = () => {
    const title: string = "Редактирование профиля";

    const { register, handleSubmit, formState } = useForm<IUserInfo>();
    const dispatch = useDispatch<AppDispatch>();

    const firstNameError = formState.errors["firstName"]?.message;
    const lastNameError = formState.errors["lastName"]?.message;
    const midNameError = formState.errors["middleName"]?.message;
    const kyuError = formState.errors["kyu"]?.message;
    const phoneError = formState.errors["phoneNumber"]?.message;
    const emailError = formState.errors["email"]?.message;

    const user = useSelector((state: RootState) => state.user.user);
    const onSubmit: SubmitHandler<IUserInfo> = (data) => {
        dispatch(
            putUserInfo({
                userName: user.userName,
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
                    defaultValue={user.info.lastName}
                />
                <Input
                    {...register("firstName", { required: "Это поле обязательно!" })}
                    label="Имя"
                    isError={!!firstNameError}
                    helperText={firstNameError}
                    defaultValue={user.info.firstName}
                />

                <Input
                    {...register("middleName", {
                        required: "Это поле обязательно!"
                    })}
                    label="Отчество"
                    isError={!!midNameError}
                    helperText={midNameError}
                    defaultValue={user.info.middleName}
                />
                <Input
                    {...register("kyu", {
                        required: "Это поле обязательно!"
                    })}
                    label="Кю"
                    type="number"
                    min={0}
                    max={7}
                    defaultValue={user.info.kyu}
                    isError={!!kyuError}
                    helperText={kyuError}
                />
                <Input
                    {...register("phoneNumber", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^(\+7|8)?9\d{9}$/,
                            message: "Неверный формат телефона"
                        }
                    })}
                    label="89XXXXXXXXX"
                    defaultValue={user.info.phoneNumber}
                    isError={!!phoneError}
                    helperText={phoneError}
                />
                <Input
                    {...register("email", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Неверный формат email"
                        }
                    })}
                    label="Почта"
                    defaultValue={user.info.email}
                    isError={!!emailError}
                    helperText={emailError}
                />
                <Button type="submit">Сохранить</Button>
            </form>
        </div>
    );
};
