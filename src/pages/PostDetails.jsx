import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../client.js";

const PostDetails = ({posts, setPosts}) => {
    // Grab location and post_id
    const location = useLocation();
    const { post_id } = useParams();

    // Set initial state of the post variable to the post details passed in from homepage using useNavigation and useLocation hooks to pass the data over
    const [post, setPost] = useState(location.state.post);

    // Debugging - Grab the post data to see if sent over correctly and updated correctly
    useEffect(() => {
        console.log("Post data updated: ", post);
    }, [post])

    // Create a function that updates the post state variable to increment its upvotes by 1, then update the database as well. Do the same for downvotes and comments.
    const updateUpvotes = async () => {
        const newUpvotes = post.upvotes + 1;
        setPost((prevState) => ({...prevState, upvotes: newUpvotes}));

        // Update the posts state variable with the setstate function setPost().
        // Use the prevState syntax then map over the prevState.
        // As you map over every post in posts, use the ternary operator to differentiate between the post you are on, and the rest of the posts.
        // If the post.id is the same as the post_id, then you spread the current post,and update the upvotes key to be post.upvotes + 1
        // Else, you simply implicitly return the post dictionary to keep the rest of the posts the same.
        setPosts((prevState) =>
            prevState.map((post) => post.id === post_id ? {...post, upvotes: post.upvotes + 1} : post)
        );

        const { data, error } = await supabase
        .from('posts')
        .update({upvotes: newUpvotes})
        .eq('id', post_id);

        if (error) {
            console.log("Error updating to database: ", error);
        } else {
            console.log("Success! ", data);
        }
    }

    const updateDownvotes = async () => {
        const newDownvotes = post.downvotes + 1;
        setPost((prevState) => ({...prevState, downvotes: newDownvotes}));

        setPosts((prevState) =>
            prevState.map((post) => post.id === post_id ? {...post, downvotes: post.downvotes + 1} : post)
        );

        const { data, error } = await supabase
        .from('posts')
        .update({downvotes: newDownvotes})
        .eq('id', post_id);

        if (error) {
            console.log("Error updating to database: ", error);
        } else {
            console.log("Success! ", data);
        }
    }

    // TODO: Comments html still needs to be made in order to call this function
    const updateComments = async () => {
        const newComments = post.comments + 1;
        setPost((prevState) => ({...prevState, comments: newComments}));

        setPosts((prevState) =>
            prevState.map((post) => post.id === post_id ? {...post, comments: post.comments + 1} : post)
        );

        const { data, error } = await supabase
        .from('posts')
        .update({comments: newComments})
        .eq('id', post_id);

        if (error) {
            console.log("Error updating to database: ", error);
        } else {
            console.log("Success! ", data);
        }
    }


    return(
        <div className="container bg-primary rounded-lg flex flex-col items-start h-96 justify-between">
            <h1 className="p-4">{post && post.title}</h1>

            <p className="p-4">Description: {post && post.description}</p>

            <div className="stats flex p-4">
                <div className="likes flex mr-3 bg-background p-2 rounded-full">
                    <span className="mr-2 flex items-center hover:bg-background-hover p-1 h-full rounded-full" onClick={updateUpvotes}>
                        <span className="mr-1">
                            <svg className="hover:stroke-secondary" rpl="" fill="currentColor" height="16" icon-name="upvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
                            </svg>
                        </span>
                        <span>{post && post.upvotes}</span>
                    </span>

                    <span className="flex items-center hover:bg-background-hover p-1 h-full rounded-full" onClick={updateDownvotes}>
                        <span className="mr-1">
                            <svg className="hover:stroke-secondary" rpl="" fill="currentColor" height="16" icon-name="downvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"></path>
                            </svg>
                        </span>
                        <span>{post && post.downvotes}</span>
                    </span>

                </div>

                <div className="comments-div flex items-center bg-background p-2 rounded-full hover:bg-background-hover">
                    <span><ChatBubbleOvalLeftIcon className="size-5 mr-1 hover:stroke-secondary"/></span>
                    <span>{post && post.comments}</span>
                </div>
            </div>
        </div>
    )
}

export default PostDetails;