import { useState } from "react";
import { supabase } from "../../client";

const CreateComment = ({ post_id, setComments, updateComments }) => {
    // 1. Store the value of the comment in a state variables
    const [comment, setComment] = useState('');

    // 2. Create a function to handle input change
    const handleChange = (e) => {
        setComment(e.target.value);
    }

    // 3. Create a function to submit the comment. Only send if not empty
    const handleSubmit = async (e) => {
        // Prevent page reload
        e.preventDefault();

        // Add the new comment to the database
        const { data, error } = await supabase
            .from('comments')
            .insert({description: comment, post_id: post_id})
            .select();
        
        if (error) {
            console.log("Error inserting comment: ", error);
        } else {
            console.log("Success posting a comment!", data);
            // Update the list of comments by addding the current one here
            setComments((prevState) => [...prevState, data[0]]);
            updateComments();
        }
    }


    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center">

            <input 
                type="text" 
                id="comment-box"
                placeholder="Add a Comment"
                onChange={handleChange}
                value={comment}
                className="rounded-lg px-2 py-3 bg-background-card w-1/2 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary"
            />

            <button type="submit" className="rounded-lg bg-primary px-2 py-3 m-2 hover:bg-primary-dark flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>

                <span>Comment</span>
            </button>
        </form>
    )
}

export default CreateComment;