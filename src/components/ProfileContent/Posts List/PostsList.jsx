import React from "react";
import SinglePost from "./Single Post/SinglePost";

const PostsList = (props) => {
    return (
        <div>
            {props.postData.map(post => <SinglePost post={post.post} likes={post.likesCount} key={post.id}/>)}
        </div>
    );
}

export default PostsList;
