# Проект "Журнал тренера"

## Содержание

-   [О проекте](#о-проекте)
-   [Стек приложения](#стек-приложения)
-   [Архитектура приложения](#архитектура-приложения)
-   [Установка к себе](#установка-к-себе)

## О проекте

**Веб сервис, в котором тренеры смогут вести учет посещений и оплат за тренировки**
(frontend-часть приложения)

## Стек приложения

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![Radix UI](https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white)

![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)

![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Архитектура приложения

Архитектура представляет из себя обычную [FSD](https://feature-sliced.design/ru/) (Feature-Sliced Design)

```
.
└── .../
    ├── build/ - Сборка проекта
    ├── public/ - html лежит тут
	├── types/ - глобальные типы приложений
    └── src/ - Корневая папка с кодом
        ├── app/ - Настройки приложения
			├── providers/
			├── routers/
			├── styles/ - глобальные стили
			└── App.tsx
        ├── pages/ - Полноценные страницы
        ├── widgets/ - Самодостаточные блоки
        ├── features/ - Действия пользователя
        ├── entities/ - Бизнес сущности проекта
        ├── shared/ - Переиспользуемые компоненты
        └── index.tsx
```

## Установка к себе

1. Первоначально склонируем репозиторий к себе

```
git clone https://github.com/scary327/trainers-journal
```

2. Загрузка зависимостей

```
cd /trainers-journal

npm i
```

3. Запуск dev сервера

```
npm run start
```

4. Ознакомится со всеми командами можно в package.json

```
"scripts": {
		"start": "webpack serve --open",
		"build:dev": "webpack --env mode=development",
		"build:prod": "webpack --env mode=production",
		"build:mobile": "webpack --env mode=production --env platform=mobile",
		"build:desktop": "webpack --env mode=production --env platform=desktop",
		"typecheck": "tsc",
		"lint": "eslint src/**/*.{tsx,ts}",
		"lint:fix": "eslint src/**/*.{tsx,ts} --fix",
		"format": "prettier --write \"./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\"",
		"prepare": "husky"
	},
```

5. Запуск с анализатором бандла

```
-- --env analyzer=true
```

_Либо изменить **ANALYZER=true** в файле .env_
