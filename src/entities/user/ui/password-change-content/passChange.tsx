import { classnames } from "@/shared/lib";
import { Typography, Button, Input } from "@/shared/ui";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import * as styles from "./passChange.module.css";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { postChangePass } from "@/entities/api/services";

interface IPassChangeForm {
    oldPass: string;
    newPass: string;
    repeatNewPass: string;
}
export const PassChangeContent = () => {
    const slideOutTitle: string = "Смена Пароля";
    const buttonTitle: string = "Изменить";

    const { register, handleSubmit, reset, formState } = useForm<IPassChangeForm>();

    const user = useSelector((state: RootState) => state.user.user);

    const [passError, setPassError] = useState<string>();

    const [successMessage, setSuccessMessage] = useState<string>();

    const onSubmit: SubmitHandler<IPassChangeForm> = async (data) => {
        setPassError("");
        setSuccessMessage("");
        if (data.newPass != data.repeatNewPass) {
            setPassError("Пароли не совпадают");
            return;
        }
        try {
            const result = await postChangePass({
                userName: user.userName,
                currentPassword: data.oldPass,
                newPassword: data.newPass
            });
            console.log("Результат:", result);
            setSuccessMessage(result);
        } catch (error) {
            setPassError(error.response.data[0].description);
        }
        reset();
    };

    const oldPassErrors = formState.errors["oldPass"]?.message;
    const newPassErrors = formState.errors["newPass"]?.message;
    const repeatPassErrors = formState.errors["repeatNewPass"]?.message;

    return (
        <>
            <Typography variant="text_16_b">{slideOutTitle}</Typography>
            <form
                className={classnames(styles.form_container, "scrollbar-webkit")}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}
            >
                <Input
                    label="Старый пароль"
                    className="w-full"
                    type="password"
                    isError={!!oldPassErrors}
                    helperText={oldPassErrors}
                    {...register("oldPass", { required: "Это поле является обязательным!" })}
                />
                <Input
                    label="Новый пароль"
                    className="w-full"
                    type="password"
                    isError={!!newPassErrors}
                    helperText={newPassErrors}
                    {...register("newPass", { required: "Это поле является обязательным!" })}
                />
                <Input
                    label="Повторите пароль"
                    className="w-full"
                    type="password"
                    isError={!!repeatPassErrors}
                    helperText={repeatPassErrors}
                    {...register("repeatNewPass", { required: "Это поле является обязательным!" })}
                />
                <div className="flex flex-col items-center justify-center text-center w-full gap-2">
                    {passError && (
                        <Typography variant="text_14_m" className="text-error-red">
                            {passError}
                        </Typography>
                    )}
                    {successMessage && (
                        <Typography variant="text_14_m" className="text-error-green">
                            {successMessage}
                        </Typography>
                    )}
                </div>
                <Button variant="primary" className="w-[100%]" type="submit">
                    {buttonTitle}
                </Button>
            </form>
        </>
    );
};
