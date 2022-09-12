import React, {useEffect} from "react";
import ProfileContent from "./ProfileContent";
import {connect} from "react-redux";
import {
    getUserStatus,
    mainPhotoChange,
    saveProfile,
    setProfile,
    setUserProfile,
    updateStatus
} from "../../redux/profileReducer";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


const ProfileC = (props) => {

    useEffect(() => {
            let userId = props.match.params.userId;
            if(!userId) {
                userId = props.authId
            }
            props.setProfile(userId);
            props.getUserStatus(userId);
    }, [props.match.params.userId]);


        return (
            <ProfileContent activeEditMode={props.activeEditMode} saveProfile={props.saveProfile} {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatus} isOwner={!props.match.params.userId} mainPhotoChange={props.mainPhotoChange} id={props.authId}/>
        );
    }


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.userProfile,
        status: state.profilePage.status,
        authId: state.auth.id,
        activeEditMode: state.profilePage.activeEditMode
    }
}



// let AuthRedirectComponent = AuthRedirect(ProfileC); // HOC
//
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//
// const ProfileContainer = connect(mapStateToProps, {setUserProfile, setProfile})(WithUrlDataContainerComponent);


export default compose(connect(mapStateToProps, {saveProfile ,setUserProfile, setProfile, getUserStatus, updateStatus, mainPhotoChange}),withRouter,AuthRedirect)(ProfileC);
