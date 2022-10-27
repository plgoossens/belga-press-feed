import React from "react";
import onlineMediumLogo from "../img/online.png";
import printMediumLogo from "../img/print.png";

export default function Article({article}){
    const uuid = article.uuid;
    const title = article.title;
    const lead = article.lead;
    const source = article.source;
    let image = "";
    let date = "";
    let links = [];
    const medium = article.mediumTypeGroup;
    const mediumLogo = medium === "ONLINE" ? onlineMediumLogo : printMediumLogo;

    for(let i = 0; i< article.attachments.length; i++){
        if(article.attachments[i].type==="Webpage" || article.attachments[i].type==="Page") links.push(article.attachments[i].references[0].href);
        else if(article.attachments[i].type==="Image"){
            if(article.attachments[i].references[0].representation === "ORIGINAL") image = article.attachments[i].references[0].href;
        }
    }

    return (
        <div key={uuid} className="card" style={{width:"300px"}}>
            {image && <img className="card-img-top" alt={title} src={image}/>}
            <div className="card-body">
                <h5 className="card-title"><img src={mediumLogo} alt={medium} style={{height:"1em"}}/> {title}</h5>
                <p style={{color:"grey", fontSize:"0.7em", textAlign:"right"}}>{source}</p>
                <p className="card-text">{lead}</p>
                {links.map(link=><a href={link} className="btn btn-primary" target="_blank" style={{marginRight:"10px"}}>Lien</a>)}
            </div>
        </div>
    );
}