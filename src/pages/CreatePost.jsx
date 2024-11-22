import { useEffect, useState } from 'react';
import { supabase } from '../../client';

const CreatePost = () => {
    // 1. Create a posts state variable to hold the posts data
    const [post, setPost] = useState({title: '', description: '', upvotes: 0, downvotes: 0, comments: 0, tags:[]});
    const [tagsAreActive, setTagsAreActive] = useState({'Guide': false, 'Walkthrough': false, 'Tips': false, 'Discussion': false, 'Updates': false});
    const tags = ['Guide', 'Walkthrough', 'Tips', 'Discussion', 'Updates'];

    // 2. Create a function to handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;  // Deconstruct the name and value from the target
        setPost((prev) => {
            return {
                ...prev,  // Spread the previous state. Arrow function requires a return statement
                [name]: value 
            }
        })
    }

    // 3. Create a function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(post);
    }

    // 4. Create an async function to send the data to the database
    const addPost = async (post) => {   
        if (post.title === '') {
            alert('Please enter a title');
            return;
        }

        const { data, error } = await supabase
            .from('posts')
            .insert(post)
            .select();
        
        if (error) {
            console.log("Error adding post: ", error);
        } else {
            console.log("Post added successfully: ", data);
        }

        window.location = '/';  // Redirect to the home page

    }

    // Create a function to handle tag selection
    const handleTagSelection = (e, tag) => {
        e.preventDefault();

        setTagsAreActive({...tagsAreActive, [tag]: !tagsAreActive[tag]});   // ES6: Computed Property Names. [varName] to grab string literal of variable

        // Add tag to post.tags using spread operator
        setPost((prevState) => {
            return {...prevState, tags: [...prevState.tags, tag]};
        });
    }


    return(
        <div className='flex flex-col justify-between my-10 text-left w-5/6 lg:w-1/2 2xl:w-1/3 max-w-5xl'>
            <h1 className='text-3xl font-bold'>Create New Post</h1>
            <form className='mx-auto w-full mt-10'>
                <div className="title-div mb-5 w-full">
                    <label htmlFor="title" className='block'>Title</label>
                    <input type="text" className='mt-1 bg-background-card rounded-md w-full' required id="title" name="title" onChange={handleChange}/>
                </div>

                <div className='flex flex-col justify-center mb-5'>
                <span>Post Category</span>
                <div className='flex mt-2 gap-2'>
                    {tags.map((tag) => {
                        return (
                            <button onClick={(event) => handleTagSelection(event,tag)} className={`flex ${tagsAreActive[tag] ? 'bg-secondary-dark' : 'bg-gray-700'} px-3 py-1 rounded-full items-center justify-center font-medium hover:bg-secondary transition-colors duration-200`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                                </svg>
                                {tag}
                            </button>
                        )
                    })}
                </div>
                </div>

                <div className="description-div mb-5 w-full">
                    <label htmlFor="description" className='block'>Content</label>
                    <textarea rows={5} type="text" className='mt-1 bg-background-card w-full rounded-md' id="description" name="description" onChange={handleChange}/>
                </div>

                <div className='w-full flex justify-end'>
                    <button type='submit' onClick={handleSubmit} className="bg-primary py-2 px-5 rounded-lg hover:bg-primary-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 mr-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                        <span className='ml-1'>Create Post</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;