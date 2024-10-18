import { RouterProvider } from "react-router-dom";
import { appRouter } from "@/app/routers/app.router";
import { Providers } from "./providers";
import "./styles/global.css";

//redux, radix, axios, react-query, react-hook-form
// storybook?? | jest - тесты

// Заменить Redux на React-Query + контекст или Zustand, если нужно более простое управление состоянием.
// Оставить Axios, если он используется вместе с React-Query для кастомных HTTP-запросов, но React-Query может заменить часть его функционала.
// Остальные элементы стека хорошо сбалансированы и могут быть оставлены, если они соответствуют твоим потребностям.

// Если ты планируешь активно использовать Redux для управления состоянием, RTK Query — это логичный и эффективный выбор. Он хорошо вписывается в существующую структуру и избавляет от необходимости внедрять React Query. Если же тебе не требуется глобальное управление состоянием на уровне Redux, React Query можно рассматривать как более автономное и гибкое решение.

//в зависимости от того, что юзаем на бэке: если есть graphql, то юзаем apolo client, если нет - react query | rtk query
export const App = () => {
    return (
        <Providers>
            <RouterProvider router={appRouter} />
        </Providers>
    );
};
