import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/model/user.reducer";
import paymentReducer from "@/entities/payment/model/payment.reducer";

export const mainStore = configureStore({
    reducer: {
        user: userReducer,
        payment: paymentReducer
    }
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
