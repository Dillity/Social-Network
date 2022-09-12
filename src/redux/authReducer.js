import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

let iniitialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = iniitialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                id: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth
            }

        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.url
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, id, login, email, isAuth});
export const getCaptchaUrl = (url) => ({type: GET_CAPTCHA_URL, url})

export const authMe = () => {
    return (dispatch) => {
       return authAPI.authMe().then(response => {
            if(response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, login, email, true));
            }
        });
    }
}

export const logIn = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.logIn(email, password, rememberMe, captcha).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(authMe());
        } else if(response.data.resultCode === 10){
            authAPI.captcha().then(response => {
                dispatch(getCaptchaUrl(response.data.url));
            });
            const err = response.data.messages[0];
            dispatch(stopSubmit('login', {_error: err}));
        } else {
            const err = response.data.messages[0];
            dispatch(stopSubmit('login', {_error: err}));
        }
    });
}

export const logOut = () => (dispatch) => {
    authAPI.logOut().then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
}


export default authReducer;