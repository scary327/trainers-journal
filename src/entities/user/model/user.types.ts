export interface IUser {
    role: "trainer" | "student";
    fullName: string;
    avatar?: string;
    email: string;
    kyu: number;
    phoneNumber: string;
    login: string;
    password: string;
}
