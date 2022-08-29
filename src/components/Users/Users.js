import React from "react";
import style from "./Users.module.css";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {follow_unfollow_API} from "../../api/api";
import {follow} from "../../redux/usersReducer";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL);


    return (
        <div>
            {slicedPages.map(page => <span className={props.currentPage === page && style.selectedPage} onClick={() => {props.onPageChange(page)}}>{page}</span>)}
            {props.users.map(user => <div key={user.id}>
                    <div>
                        <NavLink to={`/profile/${user.id}`}>
                        <img className={style.photo} src={user.photos.small != null ? user.photos.small : 'https://cdn-icons-png.flaticon.com/512/147/147140.png'}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ? <button disabled={props.followingInProg.some(id => id === user.id)} onClick={() => {
                                props.follow(user.id)
                        }}>Unfollow</button> :
                            <button disabled={props.followingInProg.some(id => id === user.id)} onClick={() => {
                               props.unfollow(user.id)
                        }}>Follow</button>}

                    </div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            )}
        </div>
    );
}

export default Users;