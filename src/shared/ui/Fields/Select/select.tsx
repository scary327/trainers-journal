import { forwardRef, useRef, useState } from "react";
import SelectSVG from "@/shared/icons/select.svg";

import * as styles from "./select.module.css";
import { Input } from "../Input/input";
import { classnames, useOnClickOutside } from "@/shared/lib";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    isError?: boolean;
    helperText?: string;
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
    ({ options, value, onChange, label, isError, helperText }, ref) => {
        const [display, setDisplay] = useState<boolean>(false);
        const containerRef = useRef<HTMLDivElement>(null);

        useOnClickOutside(containerRef, () => setDisplay(false));

        const handleToggleArrow = () => {
            setDisplay(!display);
        };

        const handleOptionClick = (value: string) => {
            onChange(value);
            setDisplay(false);
        };

        return (
            <>
                <div className={styles.select_container} ref={containerRef}>
                    <div className={styles.input_wrapper}>
                        <Input
                            onFocus={handleToggleArrow}
                            className={styles.input}
                            label={label}
                            ref={ref}
                            isError={isError}
                            readOnly
                            value={value ? options.find((o) => o.value === value)?.label : ""}
                        />
                        <button
                            className={styles.arrow_toggle}
                            onClick={handleToggleArrow}
                            type="button"
                        >
                            <SelectSVG />
                        </button>
                    </div>
                    {display && (
                        <div className={classnames(styles.options_container, "scrollbar-webkit")}>
                            {options.map((option) => (
                                <option
                                    key={option.value}
                                    className={styles.option}
                                    onClick={() => handleOptionClick(option.value)}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </div>
                    )}
                </div>
                {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
            </>
        );
    }
);
