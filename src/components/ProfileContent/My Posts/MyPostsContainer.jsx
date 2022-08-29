import React, {useMemo} from "react";
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {
            let action = addPostActionCreator(newPost);
            dispatch(action);
        }
    }
}



const MyPostsC = (props) => {
    const Posts = useMemo(() => <MyPosts {...props} />, [props.postData]);
    return Posts;
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostsC)
export default MyPostsContainer;