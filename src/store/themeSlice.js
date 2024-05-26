import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   theme:null,
}

const themeSlice = createSlice({
    name:'themee',
    initialState,
    reducers:{
        getCurrentTheme: (state, action)=>{
               state.theme = action.payload
               console.log('action', action.payload);
        }
    }
})
export const { getCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;