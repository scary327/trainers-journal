import { useState } from "react";

const Main = () => {
    const [value, setValue] = useState<number>(0);

    return (
        <div>
            <div>{value}</div>
            <br />
            <button onClick={() => setValue(value + 1)}>+</button>
        </div>
    );
};

export default Main;
