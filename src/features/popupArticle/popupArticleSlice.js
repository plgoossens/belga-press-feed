import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageLinks : [],
    show : false
};

const popupArticleSlice = createSlice({
    name: 'popupArticle',
    initialState: initialState,
    reducers : {
        showArticle(state, action){
            state.pageLinks = action.payload;
            state.show = true;
        },
        hidePage(state){
            state.show = false;
            state.pageLinks = [];
        }
    }
});

export const getpageLinks = (state) => state.popupArticle.pageLinks;
export const isHidePage = (state) => state.popupArticle.show;
export const {showArticle, hidePage} = popupArticleSlice.actions;
export default popupArticleSlice.reducer;