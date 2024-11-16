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
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment-box"></label>

            <input 
                type="text" 
                id="comment-box"
                placeholder="Add a Comment"
                onChange={handleChange}
                value={comment}
                className="rounded-lg px-2 py-1 bg-background w-1/2 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary"
            />

            <button type="submit" className="rounded-full bg-primary px-2 py-1 m-2 hover:bg-primary-light">Comment</button>
        </form>
    )
}

export default CreateComment;