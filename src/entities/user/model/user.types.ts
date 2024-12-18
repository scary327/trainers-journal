// export interface IUser {
//     //role: "trainer" | "student";
//     roles: string[];
//     fullName: string;
//     avatar?: string;
//     email: string;
//     kyu: number;
//     phoneNumber: string;
//     login: string;
//     password: string;
// }

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
}
