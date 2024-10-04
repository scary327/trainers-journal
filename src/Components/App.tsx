import { Outlet } from "react-router-dom"
import * as styles from "./App.module.scss"
import First from "@/assets/first.svg"

export const App = () => {
    return (
        <>
            <div className={styles.hello1}>Trainers journals</div>
            <First width={50} height={50} style={{ color: "green" }} />
            <Outlet />
        </>
    )
}
