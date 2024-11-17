export const getCurrentWeek = (): Date[] => {
    const now = new Date();
    return getWeekDates(now);
};

/**
 * Получает массив из 7 дат для выбранной недели на основе переданной даты.
 */
export const getWeekDates = (date: Date): Date[] => {
    const startOfWeek = getStartOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });
};

/**
 * Получает дату начала недели (понедельник) на основе переданной даты.
 */
export const getStartOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
};

/**
 * Функция для изменения недели на следующую или предыдущую.
 * @param currentWeek - Текущая неделя (массив из 7 дат).
 * @param offset - Сдвиг (-1 для предыдущей недели, 1 для следующей).
 */
export const changeWeek = (currentWeek: Date[], offset: number): Date[] => {
    const firstDayOfCurrentWeek = currentWeek[0];
    const newDate = new Date(firstDayOfCurrentWeek);
    newDate.setDate(newDate.getDate() + offset * 7);
    return getWeekDates(newDate);
};

export const formatWeekRangeIntl = (weekDates: Date[]): string => {
    const firstDay = weekDates[0];
    const lastDay = weekDates[6];

    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

    const firstDayStr = firstDay.toLocaleDateString("ru-RU", { day: "numeric" });
    const lastDayStr = lastDay.toLocaleDateString("ru-RU", options);

    return `${firstDayStr} - ${lastDayStr}`;
};
