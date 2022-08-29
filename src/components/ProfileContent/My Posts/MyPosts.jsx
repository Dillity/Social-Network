import React from "react";
import style from './MyPosts.module.css';
import PostsList from "../Posts List/PostsList";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {Textarea} from "../../Common/FormsControl/FormsControl";

const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {

    console.log('RENDER');
    let addNewPost = (values) => {
        props.addPost(values.newPostElement);
    }

    return (
        <div className={style.content}>
            <h2>My posts</h2>
            <div>
                <AddPostFormRedux onSubmit={addNewPost}/>
            </div>
            <PostsList postData={props.postData}/>
        </div>
    );
};


const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field rows='4' cols='40' placeholder={"What's up?"} name={'newPostElement'} component={Textarea} validate={[required, maxLength10]}/>
            </div>
            <div className={style.btn}>
                <button>Post!</button>
            </div>
        </form>
    );
}

const AddPostFormRedux = reduxForm({form: 'addPostForm'})(PostForm);
export default MyPosts;