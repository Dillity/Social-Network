import {follow_unfollow_API, userAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USER = 'SET-USER';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const IS_FETCHING = 'IS-FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProg: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USER:
            return {...state, users: action.user}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}

        case IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProg: action.inProgress ? [...state.followingInProg, action.userId] : state.followingInProg.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}


export const followSuccess = (userId) => ({type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId });
export const setUser = (user) => ({type: SET_USER, user });
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching});
export const followingInProgress = (inProgress, userId) => ({type: FOLLOWING_IN_PROGRESS, inProgress, userId});

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));

        userAPI.getUsers(currentPage, pageSize).then(response => {
            dispatch(toggleIsFetching(false));
            dispatch(setUser(response.data.items));
            dispatch(setTotalUsersCount(response.data.totalCount));
        });
    }
}
export const onPageChangeThunkCreator = (p, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(p));
        userAPI.getUsers(p, pageSize).then(response => {
            dispatch(toggleIsFetching(false));
            dispatch(setUser(response.data.items));
        });
    }
}
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgress(true, userId));
        follow_unfollow_API.unfollow(userId).then(response => {
            if(response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(followingInProgress(false, userId));
        })
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(followingInProgress(true, userId));
        follow_unfollow_API.follow(userId).then(response => {
            if(response.data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(followingInProgress(false, userId));
        });
    }
}


export default usersReducer;