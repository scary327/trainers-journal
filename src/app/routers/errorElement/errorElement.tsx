import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorElement = () => {
    const err = useRouteError();
    console.log(err);

    const navigate = useNavigate();

    return (
        <div>
            <h1>Произошла непредвиденная ошибка</h1>
            <button onClick={() => navigate("/")}>Вернуться на главную страницу</button>
        </div>
    );
};
