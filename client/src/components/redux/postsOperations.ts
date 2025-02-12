import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../types/Posts";

const BASE_URL = "http://localhost:3000";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: Omit<Post, "id">) => {
    const response = await axios.post(`${BASE_URL}/posts`, newPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    await axios.delete(`${BASE_URL}/posts/${postId}`);
    return postId;
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, content }: { postId: number; content: string }) => {
    const response = await axios.post(`${BASE_URL}/posts/${postId}/comments`, { content });
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId }: { postId: number; commentId: number }) => {
    await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
    return commentId;
  }
);
