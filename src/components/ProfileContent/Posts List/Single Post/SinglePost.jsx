import React from "react";
import style from './SinglePost.module.css';

const SinglePost = (props) => {
    return (
        <div className={`${style.content} ${style.item}`}>
            <img src='https://cdn-icons-png.flaticon.com/512/147/147140.png'/>
            <h3>{props.post}</h3>
            <span>Likes: {props.likes}</span>
        </div>
    );
}

export default SinglePost;