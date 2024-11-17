import { Input, Loader, Modal } from "@/shared/ui";
import * as styles from "./main.module.css";
import { useState } from "react";
import { Button } from "@/shared/ui/";

export const Main = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

    return (
        <div className={styles.main}>
            <div className="flex p-9 gap-x-4 items-center">
                <Button variant="primary" onClick={openModal}>
                    primary
                </Button>
                <Button variant="secondary" onClick={openModal}>
                    secondary
                </Button>
                <Button variant="empty" onClick={openModal}>
                    empty
                </Button>
                <Button variant="primary-small" onClick={openModal}>
                    принять
                </Button>
                <Button variant="cancel" onClick={openModal}>
                    отменить
                </Button>
            </div>
            <div className="flex flex-col w-[20%] gap-y-[30px] p-9">
                <div className="flex gap-x-4">
                    <Loader />
                </div>
                <Input label="Password" type="password" />
            </div>
            <Modal visible={isOpenModal} onClose={closeModal}>
                <div className="w-[300px] h-[300px] text-center">Modal</div>
            </Modal>
        </div>
    );
};
