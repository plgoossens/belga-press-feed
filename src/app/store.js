import { configureStore } from "@reduxjs/toolkit";
import feedReducer from '../features/feed/feedSlice';
import popupArticleReducer from '../features/popupArticle/popupArticleSlice';

export default configureStore({
  reducer: {
    feed: feedReducer,
    popupArticle: popupArticleReducer
  }
});
