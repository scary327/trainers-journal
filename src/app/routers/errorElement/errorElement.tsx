import { useRouteError } from "react-router-dom";
import { Button, Typography } from "@/shared/ui";

export const ErrorElement = () => {
    const err = useRouteError();
    console.log(err);

    return (
        <div className="flex flex-col gap-y-[20px] items-center">
            <Typography variant="text_24_b" tag="h1">
                Такой страницы не существует
            </Typography>
            <Button variant="empty" onClick={() => window.history.back()}>
                Вернуться
            </Button>
        </div>
    );
};
