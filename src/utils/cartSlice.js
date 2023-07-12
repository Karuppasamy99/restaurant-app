import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addCartItems: (state, action) => {
            state.items.push(action.payload);
        },
        removeCartItems: (state) => {
            state.items.pop();
        },
        clearCartItems: (state) => {
            state.items = [];
        }
    }
})

export const {addCartItems, removeCartItems, clearCartItems} = cartSlice.actions;

export default cartSlice.reducer;