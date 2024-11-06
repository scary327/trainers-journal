import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as styles from "./search.module.css";
import SearchSVG from "@/shared/icons/search.svg";

interface SearchProps {
    setSearch?: Dispatch<SetStateAction<string>>;
    delay?: number;
}

export const Search = ({ setSearch, delay = 500 }: SearchProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!setSearch) return;

        const handler = setTimeout(() => {
            setSearch(inputValue);
        }, delay);

        return () => clearTimeout(handler);
    }, [inputValue, setSearch, delay]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles.container} onClick={handleContainerClick}>
            <input
                className={styles.input}
                type="search"
                ref={inputRef}
                name="search"
                placeholder="Найти"
                onChange={handleChange}
            />
            <SearchSVG className="text-white w-[20px] h-[20px]" />
        </div>
    );
};
