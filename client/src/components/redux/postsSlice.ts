import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createPost,
  deletePost,
  createComment,
  deleteComment,
} from "./postsOperations";
import { PostsState } from "../types/Posts";

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Щось пішло не так";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p.id === action.payload.postId);
        if (post) {
          if (!post.comments) post.comments = [];
          post.comments.push(action.payload);
        }
      })      
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.posts.forEach((post) => {
          if (post.comments) {
            post.comments = post.comments.filter(
              (comment) => comment.id !== action.payload
            );
          }
        });
      });
  },
});

export default postsSlice.reducer;



