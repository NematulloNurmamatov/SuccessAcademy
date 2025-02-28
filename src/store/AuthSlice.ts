import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    is_auth: true,

}



const authSlice = createSlice({
    name: 'auth',
    initialState: initialValue,
    reducers: {
        setAuth(state, action) {
            state.is_auth = action.payload;
        },
    },
});



export const { setAuth } = authSlice.actions;
export default authSlice.reducer;