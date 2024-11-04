import { Typography } from "../Typography/typography";
import * as styles from "./pageTitle.module.css";

interface PageTitleProps {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <div className={styles.container}>
            <Typography tag="span" variant="text_18_b" className={styles.title}>
                {title}
            </Typography>
        </div>
    );
};
