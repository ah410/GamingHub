import { useParams, useLocation } from "react-router-dom";

const PostDetails = () => {
    // Get the post_id from the URL
    const { post_id } = useParams();

    // Get the post data from the location state using the useLocation hook instead of querying the database again
    const location = useLocation();
    const post = location.state.post;

    return(
        <div>
            <h1>Post Details Page! Post_ID: {post_id}</h1>
            <p>Description: {post.description}</p>
            <p>Upvotes: {post.upvotes}</p>
            <p>Downvotes: {post.downvotes}</p>
            <p>Comments: {post.comments}</p>
        </div>
    )
}

export default PostDetails;