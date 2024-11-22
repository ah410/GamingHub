import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";

const EditPost = () => {
    const { post_id } = useParams();
    const [tagsAreActive, setTagsAreActive] = useState({'Guide': false, 'Walkthrough': false, 'Tips': false, 'Discussion': false, 'Updates': false});
    const tags = ['Guide', 'Walkthrough', 'Tips', 'Discussion', 'Updates'];

    let post = {};
    const [ postDetails, setPostDetails ] = useState({title: '', description: '', tag: ''});
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
        setPostDetails({title: data[0].title, description: data[0].description, tag: data[0].tag});
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
        if (postDetails.tag !== '') {
            post = {...post, tag: postDetails.tag};
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

    // Create a function to handle tag selection
    const handleTagSelection = (e, tag) => {
        e.preventDefault();

        // Check if any of the tags are active, if so return, if not, set the tag to active
        const tagActive = {};
        Object.keys(tagsAreActive).map((tag) => {
            if (tagsAreActive[tag]) {
                tagActive[tag] = true;
            } 
        });

        // If there is an active tag AND the active tag isn't the one clicked on, return. Else, set the clicked tag to active and add it to the post
        if (Object.values(tagActive)[0] && Object.keys(tagActive)[0] != tag) {
            return;
        } else {
            setTagsAreActive({...tagsAreActive, [tag]: !tagsAreActive[tag]});   // ES6: Computed Property Names. [varName] to grab string literal of variable
            setPostDetails((prevState) => {
                return {...prevState, tag: tag};
            });
        }
    }

    return(
        <div className="flex flex-col justify-between my-10 text-left w-11/12 sm:w-5/6 lg:w-1/2 2xl:w-1/3 max-w-5xl">
            <h1  className='text-3xl font-bold'>Edit Post</h1>
            <form className='mx-auto w-full mt-10'>
                <div className="title-div mb-5 w-full">
                    <label htmlFor="title" className='block'>Title</label>
                    <input type="text" className='mt-1 bg-background-card rounded-md w-full' required id="title" name="title" value={postDetails.title} onChange={handleChange}/>
                </div>

                <div className='flex flex-col justify-center mb-5'>
                    <span>Post Category</span>
                    <div className='flex flex-wrap mt-2 gap-2'>
                        {tags.map((tag, index) => {
                            return (
                                <button key={index} onClick={(event) => handleTagSelection(event,tag)} className={`flex ${tagsAreActive[tag] ? 'bg-secondary-dark' : 'bg-gray-700'} px-3 py-1 rounded-full items-center justify-center font-medium hover:bg-secondary transition-colors duration-200`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>
                                    {tag}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="description-div mb-5">
                    <label htmlFor="description" className='block'>Description</label>
                    <textarea rows={7} type="text" className='mt-1 bg-background-card rounded-md w-full' id="description" name="description" value={postDetails.description} onChange={handleChange}/>
                </div>

                <div className="flex items-center justify-end">
                    <button type='submit' onClick={deletePost} className="bg-accent p-3 mr-4 rounded-lg hover:bg-accent-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-4 h-4 mr-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                        <span>Delete</span>
                    </button>
                    <button type='submit' onClick={handleSubmit} className="bg-primary p-3 rounded-lg hover:bg-primary-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save w-4 h-4 mr-2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;