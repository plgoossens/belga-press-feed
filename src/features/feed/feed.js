import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Article from "../../components/article";
import { isArticlesError, isArticlesLoading, loadArticles, selectArticles } from "./feedSlice";
import loading from '../../img/loading.svg';

export default function Feed(){
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const isLoading = useSelector(isArticlesLoading);
    const isError = useSelector(isArticlesError);

    useEffect(() => {
        dispatch(loadArticles());
    }, [dispatch]);

    return (
        <div style={{display:"grid", gridTemplateColumns:"300px 300px 300px",gridAutoFlow: "row", justifyItems: "center", justifyContent: "center", gridGap: "20px"}}>
            {isLoading && <img src={loading} alt="loading" style={{width:"300px"}}/>}
            {isError && <h1 style={{color:"red"}}>Erreur de chargement</h1>}
            {articles.length > 0 && articles.map(article => <Article article={article}/>)}
        </div>
    );
}