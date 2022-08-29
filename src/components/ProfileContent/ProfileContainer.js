import React from "react";
import ProfileContent from "./ProfileContent";
import {connect} from "react-redux";
import {getUserStatus, setProfile, setUserProfile, updateStatus} from "../../redux/profileReducer";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


class ProfileC extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 25446
        }
        this.props.setProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <ProfileContent {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.userProfile,
        status: state.profilePage.status
    }
}



// let AuthRedirectComponent = AuthRedirect(ProfileC); // HOC
//
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
//
// const ProfileContainer = connect(mapStateToProps, {setUserProfile, setProfile})(WithUrlDataContainerComponent);


export default compose(connect(mapStateToProps, {setUserProfile, setProfile, getUserStatus, updateStatus}),withRouter,AuthRedirect)(ProfileC);
