import { classnames } from "@/shared/lib";
import * as styles from "./checkbox.module.css";
import CheckSVG from "@/shared/icons/checkbox.svg";
import CheckMinusSVG from "@/shared/icons/checkboxMinus.svg";

interface ICheckboxProps {
    check: boolean;
    setCheck: (value: boolean) => void;
    className?: string;
}

export const Checkbox = ({ check, setCheck, className }: ICheckboxProps) => {
    return (
        <button
            className={classnames(styles.button, check ? styles.button_check : "", className)}
            onClick={() => setCheck(!check)}
        >
            {check ? (
                <CheckSVG className="w-full h-full" />
            ) : (
                <CheckMinusSVG className="w-full h-full text-blue-medium" />
            )}
        </button>
    );
};
