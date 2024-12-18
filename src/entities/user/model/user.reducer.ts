import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserInfo } from "./user.types";

interface UserState {
    isAuth: boolean;
    user: IUser;
    loading: boolean;
    errorMessage: string;
    token: string;
}

interface IAuthData {
    userName: string;
    password: string;
}

const URL = "http://85.192.48.165:5001/api";

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
              }
          },
    loading: false,
    isAuth: false,
    errorMessage: "",
    token: ""
};

export const signInUserApi = (data: IAuthData) =>
    fetch(`${URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then((res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err))));

export const getUserInfoApi = (data: string[]) =>
    fetch(`${URL}/trainer/info?userName=${data[0]}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${data[1]}`
        }
    }).then((res) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err))));

export const signIn = createAsyncThunk("auth/signin", async (data: IAuthData, { dispatch }) => {
    const response = await signInUserApi(data);
    dispatch(getUserInfo([response.userName, response.token]));
    return response;
});

export const getUserInfo = createAsyncThunk(
    "auth/getinfo",
    async (data: string[]) => await getUserInfoApi(data)
);

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
                state.token = action.payload.token;
                state.user.roles = action.payload.roles;
                state.user.userName = action.payload.userName;
                state.isAuth = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            //getInfo
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                //setInfo(action.payload);
                state.user.info.email = action.payload.email;
                state.user.info.kyu = action.payload.kyu;
                state.user.info.phoneNumber = action.payload.phoneNumber;
                state.user.info.firstName = action.payload.firstName;
                state.user.info.lastName = action.payload.lastName;
                state.user.info.middleName = action.payload.middleName;
                state.loading = false;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            });
    }
});

export const { setUser, clearUser, setLoading, setInfo } = userSlice.actions;
export default userSlice.reducer;
