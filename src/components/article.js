import React from "react";
import { useDispatch } from "react-redux";
import { showArticle } from "../features/popupArticle/popupArticleSlice";
import onlineMediumLogo from "../img/online-grey.png";
import printMediumLogo from "../img/print-grey.png";
import './article.css';

const formatMinutes = (min) => {
    if(min<10) return `0${min}`;
    else return min;
}

export default function Article({article}){
    const dispatch = useDispatch();

    const uuid = article.uuid;
    const title = article.title;
    const lead = article.lead;
    const source = article.source;
    let image = "";
    const date = new Date (Date.parse(article.publishDate));
    const dateString = `Publié le ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} à ${date.getHours()}:${formatMinutes(date.getMinutes())}`;
    let webLink = "";
    let pageLinks = "";
    const medium = article.mediumTypeGroup;
    const mediumLogo = medium === "ONLINE" ? onlineMediumLogo : printMediumLogo;

    let articleLink = "";

    for(let i = 0; i< article.attachments.length; i++){
        if(article.attachments[i].type==="Webpage") webLink = article.attachments[i].references[0].href;
        else if(article.attachments[i].type==="Image"){
            if(article.attachments[i].references[0].representation === "ORIGINAL") image = article.attachments[i].references[0].href;
        }else if(article.attachments[i].type==="Page"){
            pageLinks = article.attachments[i].references[0].href;
        }
    }

    if(medium === "ONLINE") articleLink = webLink;

    const articleClickHandler = ({articleLink, medium}) => {
        if(medium === "ONLINE") window.open(articleLink, '_blank', 'noopener,noreferrer');
        else{
            dispatch(showArticle(pageLinks));
        }
    }

    return (
        <div key={uuid} className="article" onClick={() => articleClickHandler({articleLink, medium})}>
            <div className="article-header">
                <img src={mediumLogo} alt={medium} className="article-medium"/>
                <span className="article-source">{source}</span>
            </div>
            <div className="article-body">
                <div className="article-body-left">
                    <h4 className="article-title">{title}</h4>
                    <p className="article-lead">{lead}</p>
                </div>
                {image && (
                    <div className="article-body-right">
                        <img className="article-image" src={image} alt={title}/>
                    </div>
                )}
            </div>
            <div className="article-footer">
                <span className="article-date">{dateString}</span>
            </div>
        </div>
    );
}