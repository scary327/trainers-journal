import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserInfo } from "./user.types";
import { getUserInfo, signIn } from "@/entities/api/services";

interface UserState {
    isAuth: boolean;
    user: IUser;
    loading: boolean;
    errorMessage: string;
}
export interface IAuthData {
    userName: string;
    password: string;
}

const initialState: UserState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : {
              roles: ["trainer"],
              userName: "sanya228",
              info: {
                  firstName: "Александр",
                  lastName: "Коновалов",
                  middleName: "Александрович",
                  email: "apapapa@gmail.com",
                  kyu: 5,
                  phoneNumber: "77777777777"
              },
              token: ""
          },
    loading: false,
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
            state.user = initialState.user;
            localStorage.removeItem("user");
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // signin
            .addCase(signIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user.token = action.payload.token;
                state.user.roles = action.payload.roles;
                state.user.userName = action.payload.userName;
                state.isAuth = true;
                localStorage.setItem("user", JSON.stringify(state.user));
                console.log(localStorage.getItem("user"));
            })
            .addCase(signIn.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
                console.log(action);
            })
            //getInfo
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                //setInfo(action.payload);
                // state.user.info.email = action.payload.email;
                // state.user.info.kyu = action.payload.kyu;
                // state.user.info.phoneNumber = action.payload.phoneNumber;
                // state.user.info.firstName = action.payload.firstName;я
                // state.user.info.lastName = action.payload.lastName;
                // state.user.info.middleName = action.payload.middleName;
                state.user.info = action.payload;
                state.loading = false;
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            });
    }
});

export const { setUser, clearUser, setLoading, setInfo } = userSlice.actions;
export default userSlice.reducer;
