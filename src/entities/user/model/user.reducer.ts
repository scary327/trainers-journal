import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserInfo } from "./user.types";
import { getStudentInfo, getUserInfo, putUserInfo, signIn } from "@/entities/api/services";

interface UserState {
    isAuth: boolean;
    user: IUser;
    isAuthLoading: boolean;
    isInfoLoading: boolean;
    errorMessage: string;
}
export interface IAuthData {
    userName: string;
    password: string;
}

const initialState: UserState = {
    user: {
        roles: ["trainer"],
        userName: "",
        info: {
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            kyu: 0,
            phoneNumber: ""
        },
        token: ""
    },
    isAuthLoading: true,
    isInfoLoading: true,
    isAuth: false,
    errorMessage: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
            console.log(state.user);
        },
        setInfo(state, action: PayloadAction<IUserInfo>) {
            state.user.info = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
            console.log(state.user);
        },
        clearUser(state) {
            localStorage.removeItem("user");
            state.user = initialState.user;
            state.isAuth = false;
        },
        tryGetUser(state, action: PayloadAction<string>) {
            state.user = JSON.parse(action.payload);
            state.isAuthLoading = false;
            state.isAuth = true;
        }
    },
    extraReducers: (builder) => {
        builder
            // signin
            .addCase(signIn.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isAuthLoading = false;
                state.isInfoLoading = true;
                state.user.token = action.payload.token;
                state.user.roles = action.payload.roles;
                state.user.userName = action.payload.userName;
                localStorage.setItem("user", JSON.stringify(state.user));
                console.log(localStorage.getItem("user"));
            })
            .addCase(signIn.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
                console.log(action);
            })
            //getInfo Trainer
            .addCase(getUserInfo.pending, (state) => {
                state.isInfoLoading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.user.info = action.payload;
                state.isInfoLoading = false;
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
                state.isInfoLoading = false;
            })
            //putInfo Trainer
            .addCase(putUserInfo.pending, (state) => {
                state.isInfoLoading = true;
            })
            .addCase(putUserInfo.fulfilled, (state, action) => {
                state.user.info = action.payload;
                state.isInfoLoading = false;
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(putUserInfo.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            //putInfo Student
            .addCase(getStudentInfo.pending, (state) => {
                state.isInfoLoading = true;
            })
            .addCase(getStudentInfo.fulfilled, (state, action) => {
                state.user.info = action.payload;
                state.isInfoLoading = false;
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(getStudentInfo.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
                state.isInfoLoading = false;
            });
    }
});

export const { setUser, clearUser, setInfo, tryGetUser } = userSlice.actions;
export default userSlice.reducer;
