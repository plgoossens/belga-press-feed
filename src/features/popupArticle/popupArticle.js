import React from "react";
import './popupArticle.css';
import { getpageLinks, hidePage, isHidePage } from "./popupArticleSlice";
import { useDispatch, useSelector } from "react-redux";

export default function PopupArticle(){
    const dispatch = useDispatch();
    const displayPopup = useSelector(isHidePage);
    const pageLinks = useSelector(getpageLinks);

    const closeWindow = () => {
        dispatch(hidePage());
    }

    return (
        <div className="popupcontainer" style={{
            visibility: displayPopup ? 'visible' : 'hidden'
            }}>
            <div className="popup">
                <button className="closeButton" onClick={()=>closeWindow()}>X</button>
                <img src={pageLinks} alt="article" className="popupArticle" />
            </div>
        </div>
    );
}