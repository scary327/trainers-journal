import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudents } from "@/entities/api/services";
import { IStudent } from "@/widgets";
import { postStudent } from "@/entities/api/services/postStudents";
import { IAuthData } from "@/entities/user/model/user.reducer";

// interface ISliceStudent {
//     "userName": "string",
//        "firstName": "string",
//        "lastName": "string",
//        "middleName": "string",
//        "groupName": "string",
//        "walletBalance": 0,
//        "kyu": 0
// }
export interface SliceStudent {
    isLoading: boolean;
    errorMessage: string;
    students: IStudent[];
    authData: IAuthData | null;
}

const initialState: SliceStudent = {
    isLoading: false,
    errorMessage: "",
    students: [],
    authData: null
};

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        // setUser(state, action: PayloadAction<IUser>) {
        //     state.user = action.payload;
        //     localStorage.setItem("user", JSON.stringify(state.user));
        //     console.log(state.user);
        // },
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload;
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            // POST
            .addCase(postStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postStudent.fulfilled, (state, action: PayloadAction<IAuthData>) => {
                state.isLoading = false;
                state.authData = action.payload;
            })
            .addCase(postStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            });
    }
});

export default studentsSlice.reducer;
