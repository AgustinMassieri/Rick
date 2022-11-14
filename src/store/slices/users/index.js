import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        setEmail: (state, action) =>{
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        clearEmailAndPassword: (state) => {
            state.email = '',
            state.password = ''
        }
    }
})

export const { setEmail, setPassword, email, password, clearEmailAndPassword } = usersSlice.actions;

export default usersSlice.reducer;