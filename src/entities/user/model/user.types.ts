export interface IUser {
    roles: string[]; //Trainer | Student
    userName: string;
    info: IUserInfo;
    token: string;
}
export interface IUserInfo {
    firstName: string;
    lastName: string;
    middleName: string;
    kyu: number;
    phoneNumber: string;
    email: string;
    class?: number;
    address?: string;
    dateOfBirth?: string;
    gender?: number;
    walletBalance?: number;
}
