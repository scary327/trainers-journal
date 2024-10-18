import { useState } from "react";
import * as styles from "./main.module.css";

const Main = () => {
    const [value, setValue] = useState<number>(0);

    return (
        <div>
            <div className={styles.value_container}>{value}</div>
            <br />
            <button className="p-5" onClick={() => setValue(value + 1)}>
                +
            </button>
        </div>
    );
};

export default Main;
