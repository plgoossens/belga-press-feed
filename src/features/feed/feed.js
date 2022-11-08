import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Article from "../../components/article";
import { isArticlesError, isArticlesLoading, loadArticles, selectArticles, loadNextArticles, areNextArticlesLoaded } from "./feedSlice";
import loading from '../../img/loading.svg';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

export default function Feed(){
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const isLoading = useSelector(isArticlesLoading);
    const isError = useSelector(isArticlesError);
    const nextArticlesLoaded = useSelector(areNextArticlesLoaded);

    useEffect(() => {
        dispatch(loadArticles());
    }, [dispatch]);

    useBottomScrollListener(() => {
        if(!nextArticlesLoaded)
            dispatch(loadNextArticles());
    });

    return (
        <div style={{display:"flex", flexDirection: "column", justifyContent: "center"}}>
            {articles.length > 0 && articles.map(article => <Article article={article}/>)}
            {isLoading && <img src={loading} alt="loading" style={{width:"300px", margin:"auto"}}/>}
            {isError && <h1 style={{color:"red"}}>Erreur de chargement</h1>}
        </div>
    );
}