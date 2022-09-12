import React from "react";
import LoginForm, {LoginReduxForm} from "./LoginForm";
import {logIn} from "../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const LoginC = (props) => {
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) return <Redirect to={'profile'} />
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm captcha={props.captcha} onSubmit={onSubmit} />
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captchaUrl
    }
}



export const Login = connect(mapStateToProps, {logIn})(LoginC);