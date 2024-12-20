import * as styles from "./slideOutMenu.module.css";
import { useEffect, useRef } from "react";
import { classnames, useOnClickOutside } from "@/shared/lib";

interface SlideOutMenuProps {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
}

export const SlideOutMenu = ({ isOpen, onClose, children }: SlideOutMenuProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(containerRef, () => onClose());

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Блокируем скролл
        } else {
            document.body.style.overflow = ""; // Восстанавливаем поведение по умолчанию
        }

        // Чистим эффект при размонтировании компонента
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className={classnames(styles.container, { [styles.open]: isOpen })} ref={containerRef}>
            {children}
        </div>
    );
};
