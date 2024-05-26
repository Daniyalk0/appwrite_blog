import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postsData:[],
}

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        getPostsData: (state, action) =>{
            (state.postsData = action.payload)
        },
    }
})

export const {getPostsData} = PostsSlice.actions;
export default PostsSlice.reducer
