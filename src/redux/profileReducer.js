import {profileAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SET_PHOTOS = 'SET-PHOTOS';
const ACTIVE_EDIT_MODE = 'ACTIVE_EDIT_MODE';


let initialState = {
    postData: [
        {id: 1, post: 'Hello', likesCount: 5},
        {id: 2, post: 'What is your name?', likesCount: 12},
        {id: 3, post: 'I like music', likesCount: 1}
    ],
    userProfile: null,
    activeEditMode: false,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData, {id: 4, post: action.newPost, likesCount: 0}]
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        case SET_PHOTOS:
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos}
            }

        case ACTIVE_EDIT_MODE:
            return {
                ...state,
                activeEditMode: action.mode
            }

        default:
            return state;
    }
}


export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setPhotosSuccess = (photos) => ({type: SET_PHOTOS, photos})
export const activeEditMode = (mode) => ({type: ACTIVE_EDIT_MODE, mode})

export const setProfile = (userId) => {
    return (dispatch) => {
        profileAPI.setUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        });
    }
}
export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        });
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            // } else {
            //     // console.log(response.data.messages[0]);
            //     alert(response.data.messages[0]);
            }
        });
    }
}
export const mainPhotoChange = (file) => (dispatch) => {
    profileAPI.mainPhotoChange(file).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setPhotosSuccess(response.data.data.photos));
        }
    });
}
export const saveProfile = (data, id) => (dispatch) => {
    profileAPI.saveProfile(data).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setProfile(id));
            dispatch(activeEditMode(false));
        } else {
            dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}));
            dispatch(activeEditMode(true));
        }
    });
}

export default profileReducer;