import { useEffect, useState } from 'react';
import { supabase } from '../../client';

const CreatePost = () => {
    // 1. Create a posts state variable to hold the posts data
    const [post, setPost] = useState({title: '', description: '', upvotes: 0, downvotes: 0, comments: 0});

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
            .insert({
                title: post.title, 
                description: post.description, 
                upvotes: post.upvotes, 
                downvotes: post.downvotes, 
                comments: post.comments
            })
            .select();
        
        if (error) {
            console.log("Error adding post: ", error);
        } else {
            console.log("Post added successfully: ", data);
        }

        window.location = '/';  // Redirect to the home page

    }

    // 5. useEffet to verify post data is being updated
    useEffect(() => {
        console.log(post)
    }, [post]);


    return(
        <div className='flex flex-col justify-between my-10 text-left w-5/6 lg:w-1/2 2xl:w-1/3 max-w-5xl'>
            <h1>Create New Post</h1>
            <form className='mx-auto w-full mt-10'>
                <div className="title-div mb-5 w-full">
                    <label htmlFor="title" className='block'>Title</label>
                    <input type="text" className='mt-1 bg-background-card rounded-md w-full' required id="title" name="title" onChange={handleChange}/>
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