import * as styles from "./radio.module.css";

interface RadioProps {
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

export const Radio = ({ checked, onChange, value }: RadioProps) => {
    //todo доделать
    return (
        <input
            type="radio"
            className={styles.radio}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
        />
    );
};
