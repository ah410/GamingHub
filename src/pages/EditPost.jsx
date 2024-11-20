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
        setPostDetails({title: data[0].title, description: data[0].description})
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


    const deletePost = async (e) => {
        e.preventDefault();
        
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
        <div className="flex flex-col justify-between my-10 text-left w-5/6 lg:w-1/2 2xl:w-1/3 max-w-5xl">
            <h1>Edit Post</h1>
            <form className='mx-auto w-full mt-10'>
                <div className="title-div mb-5 w-full">
                    <label htmlFor="title" className='block'>Title</label>
                    <input type="text" className='mt-1 bg-background-card rounded-md w-full' required id="title" name="title" value={postDetails.title} onChange={handleChange}/>
                </div>

                <div className="description-div mb-5">
                    <label htmlFor="description" className='block'>Description</label>
                    <textarea rows={5} type="text" className='mt-1 bg-background-card rounded-md w-full' id="description" name="description" value={postDetails.description} onChange={handleChange}/>
                </div>

                <div className="flex items-center justify-end">
                    <button type='submit' onClick={deletePost} className="bg-accent p-3 mr-4 rounded-lg hover:bg-accent-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 w-4 h-4 mr-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                        <span>Delete</span>
                    </button>
                    <button type='submit' onClick={handleSubmit} className="bg-primary p-3 rounded-lg hover:bg-primary-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save w-4 h-4 mr-2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;