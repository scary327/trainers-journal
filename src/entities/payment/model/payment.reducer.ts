import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayment } from "./payment.types";

interface PaymentState {
    payments: IPayment[];
    loading: boolean;
}

const initialState: PaymentState = {
    payments: [],
    loading: false
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPayments(state, action: PayloadAction<IPayment[]>) {
            state.payments = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
});

export const { setPayments, setLoading } = paymentSlice.actions;
export default paymentSlice.reducer;
