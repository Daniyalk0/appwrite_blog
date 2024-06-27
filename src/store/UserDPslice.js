import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPic: null,
}

const UserDPslice = createSlice({
    name: "userDP",
    initialState,
    reducers:{
        getDPid: (state, action) =>{
            state.userPic = action.payload
        },
    }
})

export const {getDPid} = UserDPslice.actions;
export default UserDPslice.reducer;