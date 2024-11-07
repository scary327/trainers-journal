import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./user.types";

interface UserState {
    user: IUser;
    loading: boolean;
}

const initialState: UserState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : {
              fullName: "",
              email: "",
              kyu: 6,
              phoneNumber: "",
              avatar: ""
          },
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        clearUser(state) {
            state.user = initialState.user;
            localStorage.removeItem("user");
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
