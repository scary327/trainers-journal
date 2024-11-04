import { classnames } from "@/shared/lib";
import { ComponentProps, ReactNode } from "react";
import * as styles from "./button.module.css";

type Variant = "primary" | "secondary" | "empty" | "primary-small" | "cancel";

interface ButtonProps extends ComponentProps<"button"> {
    variant?: Variant;
    children: ReactNode;
    className?: string;
}

export const Button = (props: ButtonProps) => {
    const { variant, children, className, ...rest } = props;

    return (
        <button
            type={props.type ? props.type : "button"}
            className={classnames(styles.button, styles[variant ?? "primary"], className)}
            {...rest}
        >
            {children}
        </button>
    );
};
