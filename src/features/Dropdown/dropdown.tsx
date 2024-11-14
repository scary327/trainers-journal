import { ReactNode, useState } from "react";
import * as styles from "./dropdown.module.css";
import ArrowDownSVG from "@/shared/icons/arrowDown.svg";
import { classnames } from "@/shared/lib";

interface DropdownProps {
    header: ReactNode;
    content: ReactNode;
}

export const Dropdown = ({ header, content }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div onClick={() => toggleDropdown()}>
            <div className={classnames(styles.dropdown_header, { [styles.open]: isOpen })}>
                {header}
                <button className={styles.dropdown_button}>
                    {isOpen ? (
                        <ArrowDownSVG className={classnames(styles.arrow, "rotate-180")} />
                    ) : (
                        <ArrowDownSVG className={classnames(styles.arrow, "rotate-0")} />
                    )}
                </button>
            </div>
            <div className={classnames(styles.dropdown_content, { [styles.open]: isOpen })}>
                {content}
            </div>
        </div>
    );
};
