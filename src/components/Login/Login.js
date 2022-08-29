import React from "react";
import LoginForm, {LoginReduxForm} from "./LoginForm";
import {logIn} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const LoginC = (props) => {
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe)
    }
    if(props.isAuth) return <Redirect to={'profile'} />
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}



export const Login = connect(mapStateToProps, {logIn})(LoginC);