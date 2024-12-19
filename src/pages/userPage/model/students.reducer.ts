import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudents } from "@/entities/api/services";
import { IStudent } from "@/widgets";
import { postStudent } from "@/entities/api/services/postStudents";
import { IAuthData } from "@/entities/user/model/user.reducer";

// export interface IStudent {
//     groupId: string;
//     studentInfoItemDto: {
//         firstName: string; +
//         lastName: string; +
//         middleName: string; +
//         dateOfBirth: string; +
//         kyu: number; +
//         class: number; +
//         address: string; +
//         phoneNumber: string; +
//         email: string; +
//         gender: number;

//     };
//     contacts?: IContact[];
// }
// {
//     "userName": "string", +
//     "firstName": "string", +
//     "lastName": "string", +
//     "middleName": "string", +
//     "kyu": 0, +
//     "dateOfBirth": "2024-12-19", +
//     "class": 0, +
//     "address": "string", +
//     "phoneNumber": "string", +
//     "email": "string", +
//     "gender": 0, +
//     "walletBalance": 0, +
//     "groupName": "string" +
//   }
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
                state.students = action.payload.map((item) => ({
                    groupId: "", // Предполагается, что groupId есть в item, если нет, нужно будет его добавить
                    studentInfoItemDto: {
                        firstName: item.firstName,
                        lastName: item.lastName,
                        middleName: item.middleName,
                        dateOfBirth: item.dateOfBirth,
                        kyu: item.kyu,
                        class: item.class,
                        address: item.address,
                        phoneNumber: item.phoneNumber,
                        email: item.email,
                        gender: item.gender,
                        walletBalance: item.walletBalance, // Если есть
                        groupName: item.groupName // Если есть
                    },
                    contacts: [] // Если есть, иначе пустой массив
                }));
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
