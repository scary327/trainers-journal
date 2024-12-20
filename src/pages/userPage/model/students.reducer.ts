import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStudentContacts, getStudents, putStudent } from "@/entities/api/services";
import { IContact, IStudent } from "@/widgets";
import { postStudent } from "@/entities/api/services/postStudents";
import { IAuthData } from "@/entities/user/model/user.reducer";

export interface SliceStudent {
    isLoading: boolean;
    errorMessage: string;
    students: IStudent[];
    authData: IAuthData | null;
    currentStudentContacts: IContact[];
}

const initialState: SliceStudent = {
    isLoading: true,
    errorMessage: "",
    students: [],
    authData: null,
    currentStudentContacts: []
};

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload.map((item) => ({
                    groupId: "",
                    studentInfoItemDto: {
                        userName: item.userName,
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
                        walletBalance: item.walletBalance,
                        groups: item.groups
                    },
                    contacts: []
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
            })
            // PUT
            .addCase(putStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(putStudent.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(putStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            })
            // GET CONTACTS
            .addCase(getStudentContacts.fulfilled, (state, action) => {
                state.currentStudentContacts = action.payload.map((item) => item.contactItem); // [ {contactsItem: IContact, id: string} ]
            })
            .addCase(getStudentContacts.rejected, (state, action) => {
                state.errorMessage = action.error.message ?? "Неизвестная ошибка";
            });
    }
});

export default studentsSlice.reducer;
