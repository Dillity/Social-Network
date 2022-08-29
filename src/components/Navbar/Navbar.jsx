import React, {useState} from "react";
import style from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {

    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);
    const updateTime = () => {
        const newTime = new Date().toLocaleTimeString();
        setTime(newTime);
    }
    setInterval(updateTime, 1000);

    return (
        <nav className={style.nav}>
            <div className={style.item}><NavLink to='/profile' className={({isActive}) => isActive ? style.active : undefined}>Profile</NavLink></div>
            <div className={style.item}><NavLink to='/messages' className={({isActive}) => isActive ? style.active : undefined}>Messages</NavLink></div>
            <div className={style.item}><NavLink to='/users' className={({isActive}) => isActive ? style.active : undefined}>Users</NavLink></div>
            <div className={style.item}><NavLink to='/news' className={({isActive}) => isActive ? style.active : undefined}>News</NavLink></div>
            <div className={style.item}><NavLink to='/music' className={({isActive}) => isActive ? style.active : undefined}>Music</NavLink></div>
            <div className={`${style.item} ${style.settings}`}><NavLink to='/settings' className={({isActive}) => isActive ? style.active : undefined}>Settings</NavLink></div>
            <div className={style.time}>{time}</div>
            <div className={`${style.item} ${style.friends}`}><h1>Friends</h1></div>
        </nav>
    );
}

export default Navbar;