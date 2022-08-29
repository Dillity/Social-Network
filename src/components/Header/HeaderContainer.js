import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {authMe, logOut, setAuthUserData} from "../../redux/authReducer";


class HeaderC extends React.Component {

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} logOut={this.props.logOut}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData, authMe, logOut})(HeaderC);