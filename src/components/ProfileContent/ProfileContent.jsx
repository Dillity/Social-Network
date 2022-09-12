import React from "react";
import Avatar from "./Avatar/Avatar";
import style from './ProfileContent.module.css'
import MyPostsContainer from "./My Posts/MyPostsContainer";

const ProfileContent = (props) => {
    return (
        <div className={style.content}>
            <div className={style.mainImage}><img src='https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg' /></div>
            <Avatar activeEditMode={props.activeEditMode} profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} mainPhotoChange={props.mainPhotoChange} id={props.id} saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    );
}

export default ProfileContent;