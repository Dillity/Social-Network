import React, {useEffect, useState} from "react";
import style from './Avatar.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import {ProfileDataForm} from "./ProfileDataForm";


const   Avatar = (props) => {

    let [editMode, setEditMode] = useState(false);

    let onSubmit = (formData) => {
        props.saveProfile(formData, props.id);
    }
    useEffect(() => {
        {props.activeEditMode ? setEditMode(true) : setEditMode(false)}
    }, [props]);

    if (!props.profile) {
        return (<Preloader/>);
    }


    return (
        <div className={style.content}>
            <div>
                <img src={props.profile.photos.large || 'https://cdn-icons-png.flaticon.com/512/147/147140.png'}/>
                {props.isOwner && <input type={'file'} onChange={(e) => {
                    props.mainPhotoChange(e.target.files[0])
                }}/>}
                {editMode ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} {...props} /> : <ProfileData {...props} enterEditMode={() => {setEditMode(true)}}/> }

            </div>
            <div>
                <b><ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} name={props.profile.fullName}/></b>
            </div>
        </div>
    );
}


const ProfileData = (props) => {

    return (
        <div>
            {props.isOwner && <div><button onClick={props.enterEditMode}>Edit</button></div>}
            <div><b>Looking for a job: </b> {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {props.profile.lookingForAJob && <div><b>My skills: </b> {props.profile.lookingForAJobDescription}</div>}
            <div><b>About me:</b> {props.profile.aboutMe}</div>
            <div><b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}
            </div>
        </div>
    )
}


export const Contacts = ({contactTitle, contactValue}) => {
    return (
        <div className={style.contacts}>
            <b>{contactTitle}:</b> {contactValue}
        </div>
    )
}

export default Avatar;