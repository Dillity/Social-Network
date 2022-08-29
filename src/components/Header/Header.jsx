import React, {useState} from "react";
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={style.header}>
            <div className={style.img}>
                <img src='https://kontur.ru/Files/userfiles/image/brandbook/download/logo-kontur-eng.png' />
            </div>
            <div className={style.login}>
                {props.isAuth ? <div>Welcome, {props.login} - <button onClick={props.logOut}>LogOut</button></div> : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header;