import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let iniitialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
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

        default:
            return state;
    }
}

export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, id, login, email, isAuth});

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

export const logIn = (email, password, rememberMe) => (dispatch) => {
    authAPI.logIn(email, password, rememberMe).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(authMe());
        } else {
            const err = response.data.messages[0];
            dispatch(stopSubmit('login', {_error: err}))
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