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
        <div className='h-max sm:h-fit md:h-46 lg:h-96 flex flex-col justify-between'>
            <h1>Conquer Post Creation By Making a Post!</h1>
            <form className='max-w-sm mx-auto w-full m-24'>
                <div className="title-div mb-5">
                    <label htmlFor="title" className='block'>Title:</label>
                    <input type="text" className='mt-1 text-background rounded-md' required id="title" name="title" onChange={handleChange}/>
                </div>

                <div className="description-div mb-5">
                    <label htmlFor="description" className='block'>Description:</label>
                    <textarea rows={5} type="text" className='mt-1 text-background w-full rounded-md' id="description" name="description" onChange={handleChange}/>
                </div>

                <button type='submit' onClick={handleSubmit} className="bg-primary p-3 rounded-lg hover:bg-primary-dark">Post</button>
            </form>
        </div>
    )
}

export default CreatePost;