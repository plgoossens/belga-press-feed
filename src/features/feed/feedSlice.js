import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL } from '../../data/data';

const initialState = {
    feed: {},
    isLoading: false,
    isError: false
};

export const loadArticles = createAsyncThunk(
    'feed/loadArticles',
    async () => {
        const articles = await fetch(apiURL);
        const articlesJSON = await articles.json();
        return articlesJSON.data;
    }
);

const feedSlice = createSlice({
    name: 'feed',
    initialState: initialState,
    extraReducers: {
        [loadArticles.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [loadArticles.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.feed = action.payload;
        },
        [loadArticles.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
});

export const selectArticles = (state) => state.feed.feed;
export const isArticlesLoading = (state) => state.feed.isLoading;
export const isArticlesError = (state) => state.feed.isError;
export default feedSlice.reducer;