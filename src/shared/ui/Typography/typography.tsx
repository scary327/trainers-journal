import { classnames } from "@/shared/lib";
import * as styles from "./typography.module.css";

interface Tags {
    h1: "h1";
    h2: "h2";
    h3: "h3";
    h4: "h4";
    h5: "h5";
    h6: "h6";
    p: "p";
    span: "span";
    div: "div";
}

interface Variants {
    text_10_r: "text_10_r";
    text_10_m: "text_10_m";
    text_10_b: "text_10_b";
    text_12_r: "text_12_r";
    text_12_m: "text_12_m";
    text_12_b: "text_12_b";
    text_14_r: "text_14_r";
    text_14_m: "text_14_m";
    text_14_b: "text_14_b";
    text_16_r: "text_16_r";
    text_16_m: "text_16_m";
    text_16_b: "text_16_b";
    text_18_r: "text_18_r";
    text_18_m: "text_18_m";
    text_18_b: "text_18_b";
    text_20_r: "text_20_r";
    text_20_m: "text_20_m";
    text_20_b: "text_20_b";
    text_24_r: "text_24_r";
    text_24_m: "text_24_m";
    text_24_b: "text_24_b";
}

type Tag = keyof Tags;
type Variant = keyof Variants;

interface TypographyProps {
    tag?: Tag;
    variant?: Variant;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export const Typography = ({
    tag = "div",
    variant = "text_14_m",
    children,
    style,
    className
}: TypographyProps) => {
    const Component = tag as Tag;

    return (
        <Component className={classnames(styles[variant], className)} style={style}>
            {children}
        </Component>
    );
};
