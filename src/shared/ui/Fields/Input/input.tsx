import { ComponentProps, forwardRef, useEffect, useState } from "react";
import * as styles from "./input.module.css";
import { classnames } from "@/shared/lib";

import EyeOpenSVG from "@/shared/icons/eyeOpen.svg";
import EyeCloseSVG from "@/shared/icons/eyeClose.svg";

interface InputProps extends Omit<ComponentProps<"input">, "placeholder"> {
    label?: string;
    isError?: boolean;
    helperText?: string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = "text", isError = false, helperText, className, value, ...props }, ref) => {
        const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
        const [hasValue, setHasValue] = useState<boolean>(false);
        const [isFocused, setIsFocused] = useState<boolean>(false);

        const containerClasses = classnames(styles.container, className);
        const inputClasses = classnames(styles.input, {
            [styles.error]: isError
        });

        const labelClasses = classnames(styles.label, {
            [styles.focused]: isFocused || hasValue
        });

        const handleTogglePassword = () => {
            setPasswordVisible(!passwordVisible);
        };

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
        };

        const inputType = type === "password" ? (passwordVisible ? "text" : "password") : type;

        useEffect(() => {
            setHasValue(!!value);
        }, [value]);

        return (
            <div className={containerClasses}>
                {label && <label className={labelClasses}>{label}</label>}
                <input
                    ref={ref}
                    type={inputType}
                    className={inputClasses}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    onChange={(e) => setHasValue(!!e.target.value)}
                    {...props}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className={styles.password_toggle}
                        onClick={handleTogglePassword}
                    >
                        {passwordVisible ? (
                            <EyeOpenSVG className="w-[20px] h-[20px] text-blue-dark" />
                        ) : (
                            <EyeCloseSVG className="w-[20px] h-[20px] text-blue-dark" />
                        )}
                    </button>
                )}
                {helperText && (
                    <div className={classnames(styles.helperText, { [styles.errorText]: isError })}>
                        {helperText}
                    </div>
                )}
            </div>
        );
    }
);
