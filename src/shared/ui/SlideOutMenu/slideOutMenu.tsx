import * as styles from "./slideOutMenu.module.css";
import { useRef } from "react";
import { classnames, useOnClickOutside } from "@/shared/lib";

interface SlideOutMenuProps {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
}

export const SlideOutMenu = ({ isOpen, onClose, children }: SlideOutMenuProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(containerRef, () => onClose());

    return (
        <div className={classnames(styles.container, { [styles.open]: isOpen })} ref={containerRef}>
            {children}
        </div>
    );
};
