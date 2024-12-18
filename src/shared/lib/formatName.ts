import { IUserInfo } from "@/entities/user/model/user.types";

export const formatUserName = (info: IUserInfo) => {
    const nameInitial = info.firstName ? `${info.firstName[0]}.` : "";
    return `${info.lastName} ${nameInitial}`;
};
