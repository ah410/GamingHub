import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";

const EditPost = () => {
    const { post_id } = useParams();
    const [postDatabase, setPostDatabase] = useState(null);

    let post = {};
    const [ postDetails, setPostDetails ] = useState({title: '', description: ''});
    const handleChange = (e) => {
        // Destructure event.target to grab the name and value of the DOM element
        const {name, value} = e.target;

        if (name == 'title') {
            setPostDetails((prevState) => { return {...prevState, title: value}});
        } else if (name == 'description') {
            setPostDetails((prevState) => { return {...prevState, description: value}});
        }
    }

    const fetchPost = async () => {
        const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', post_id);

        if (error) {
            console.log("Error fetching post: ", error);
        } else {
            console.log("Success fetching post: ", data);
        }
        setPostDatabase(data[0]);
    }

    useEffect(() => {
        fetchPost();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (postDetails.title !== '') {
            post = {...post, title: postDetails.title};
        } 
        if (postDetails.description !==  '') {
            post = {...post, description: postDetails.description};
        }

        // Send to supabse if post dictionary has values
        if (Object.keys(post).length !== 0) {
            updatePost();
        } else {
            alert("Please include values.");
        }

    }
    const updatePost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .update(post)
            .eq('id', post_id)
            .select();

        if (error) {
            console.log("Error updating post: ", error);
        } else {
            console.log("Success updating post: ", data);
        }

        window.location = '/';
    }


    const deletePost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post_id)
            .select();

        if (error) {
            console.log("Error deleting post: ", error);
        } else {
            console.log("Success deleting post: ", data);
        }

        window.location = '/';
    }

    return(
        <div>
            <h1>Edit Post: {postDatabase && postDatabase.title}</h1>
            <form className='max-w-sm mx-auto mt-20'>
                <div className="title-div mb-5">
                    <label htmlFor="title" className='block'>Title:</label>
                    <input type="text" className='text-background mt-1' required id="title" name="title" onChange={handleChange}/>
                </div>

                <div className="description-div mb-5">
                    <label htmlFor="description" className='block'>Description:</label>
                    <textarea rows={5} type="text" className='text-background w-full mt-1' id="description" name="description" onChange={handleChange}/>
                </div>

                <div className="flex items-center justify-center">
                    <button type='submit' onClick={handleSubmit} className="bg-primary p-3 m-2 rounded-lg hover:bg-primary-dark">Update Post</button>
                    <button type='submit' onClick={deletePost} className="bg-accent p-3 m-2 rounded-lg hover:bg-accent-dark">Delete Post</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;