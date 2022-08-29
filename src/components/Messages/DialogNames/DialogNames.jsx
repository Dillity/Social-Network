import React from "react";
import {NavLink} from "react-router-dom";
import style from './DialogNames.module.css';


const DialogNames = (props) => {
    return (
        <div className={`${style.item} ${style.active}`}>
            <NavLink to={`/messages/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}

export default DialogNames;