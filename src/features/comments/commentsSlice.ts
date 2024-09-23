import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from './types';

const loadCommentsFromLocalStorage = (): Comment[] => {
  const savedComments = localStorage.getItem('comments');
  return savedComments ? JSON.parse(savedComments) : [];
};

export const fetchComments = createAsyncThunk<Comment[], void>(
  'comments/fetchComments',
  async () => {
    const response = await fetch('https://dummyjson.com/comments');
    const data = await response.json();
    return data.comments;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: loadCommentsFromLocalStorage(),
    loading: false,
    error: null as string | null,
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
        localStorage.setItem('comments', JSON.stringify(action.payload));
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
