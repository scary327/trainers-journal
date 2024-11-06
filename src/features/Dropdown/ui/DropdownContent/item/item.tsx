import { Typography } from "@/shared/ui";

interface ItemProps {
    item_name: string;
    item_value: string;
}

export const Item = ({ item_name, item_value }: ItemProps) => {
    return (
        <div className="flex flex-col items-start gap-y-[5px] max-w-[250px]">
            <Typography variant="text_14_r" className="text-gray-text">
                {item_name}
            </Typography>
            <Typography variant="text_14_b">{item_value}</Typography>
        </div>
    );
};
