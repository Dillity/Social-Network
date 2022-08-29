import {profileAPI, userAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';


let initialState = {

    postData: [
        {id: 1, post: 'Hello', likesCount: 5},
        {id: 2, post: 'What is your name?', likesCount: 12},
        {id: 3, post: 'I like music', likesCount: 1}
    ],
    userProfile: null,
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

        default:
            return state;
    }
}


export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const setProfile = (userId) =>  {
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
            if(response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
    }
}

export default profileReducer;