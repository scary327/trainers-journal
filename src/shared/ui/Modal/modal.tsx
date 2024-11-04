import { useEffect } from "react";
import CrossSVG from "../../icons/cross.svg";

import * as styles from "./modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    visible: boolean;
}

export const Modal = ({ children, onClose, visible }: ModalProps) => {
    const onKeydown = ({ key }: KeyboardEvent) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeydown);
        return () => document.removeEventListener("keydown", onKeydown);
    });

    if (!visible) return null;

    // обязательно прописывать e.stopPropagation()
    return (
        <div className={styles.modal_container} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <button className={styles.close} onClick={onClose}>
                    <CrossSVG width={32} height={32} color="#203064" />
                </button>
                {children}
            </div>
        </div>
    );
};
