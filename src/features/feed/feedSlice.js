import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiURL, nextURL } from '../../data/data';

const initialState = {
    feed: {},
    isLoading: false,
    isError: false,
    nextArticlesLoaded: false
};

export const loadArticles = createAsyncThunk(
    'feed/loadArticles',
    async () => {
        const articles = await fetch(apiURL);
        const articlesJSON = await articles.json();
        return articlesJSON.data;
    }
);

export const loadNextArticles = createAsyncThunk(
    'feed/loadNextArticles',
    async () => {
        const articles = await fetch(nextURL);
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
            console.error(action.payload);
        },
        [loadNextArticles.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [loadNextArticles.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            action.payload.forEach((elem, key) => {
                state.feed.push(elem);
            });
            state.nextArticlesLoaded = true;
        },
        [loadNextArticles.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.error(action.payload);
        }
    }
});

export const selectArticles = (state) => state.feed.feed;
export const isArticlesLoading = (state) => state.feed.isLoading;
export const isArticlesError = (state) => state.feed.isError;
export const areNextArticlesLoaded = (state) => state.feed.nextArticlesLoaded;
export default feedSlice.reducer;