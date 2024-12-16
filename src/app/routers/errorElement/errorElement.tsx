import { useNavigate, useRouteError } from "react-router-dom";
import { URLS } from "@/app/routers/app.urls";
import { Button } from "@/shared/ui";

export const ErrorElement = () => {
    const err = useRouteError();
    console.log(err);

    const navigate = useNavigate();

    return (
        <div>
            <h1>Произошла непредвиденная ошибка</h1>
            <Button variant="empty" onClick={() => window.history.back()}>
                Вернуться
            </Button>
        </div>
    );
};
