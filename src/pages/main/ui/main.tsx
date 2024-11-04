import { Loader, Modal } from "@/shared/ui";
import * as styles from "./main.module.css";
import { useState } from "react";
import { Button } from "@/shared/ui/";

export const Main = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

    return (
        <div className={styles.main}>
            <div className="flex gap-x-4 p-9">
                <Button variant="primary" onClick={openModal}>
                    Open modal
                </Button>
                <Button variant="secondary" onClick={openModal}>
                    Open modal
                </Button>
                <Button variant="empty" onClick={openModal}>
                    Open modal
                </Button>
            </div>
            <div className="flex gap-x-4">
                <Loader />
            </div>
            <Modal visible={isOpenModal} onClose={closeModal}>
                <div className="w-[300px] h-[300px] text-center">Modal</div>
            </Modal>
        </div>
    );
};
