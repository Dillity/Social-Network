import React from "react";
import style from './Avatar.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusHooks from "./ProfileStatusHooks";

const Avatar = (props) => {
    if(!props.profile) {
        return (<Preloader />);
    }
    return (
        <div className={style.content}>
            <div>
                <img src={props.profile.photos.small || 'https://cdn-icons-png.flaticon.com/512/147/147140.png'} />
            </div>
            <div>
                <h2>{props.profile.fullName}</h2>
                <p>{props.profile.aboutMe}</p>
            </div>
            <div>
                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <div>
                <p>{props.profile.lookingForAJobDescription}</p>
            </div>

        </div>
    )
}

export default Avatar;