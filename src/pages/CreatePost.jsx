import { useState, useRef } from 'react';
import { supabase } from '../../client';
import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {
    // Create state variables
    const [post, setPost] = useState({title: '', description: '', upvotes: 0, downvotes: 0, comments: 0, tag: '', image_path: ''});
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
    const [uuid, setUuid] = useState(uuidv4());

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif'];
    const maxFileSize = 50 * 1024 * 1024; // 50MB

    const [tag, setTag] = useState('');
    const tags = ['Guide', 'Walkthrough', 'Tips', 'Discussion', 'Updates'];
    const tagColorsMap = {
        'Guide': 'bg-pink-500',
        'Walkthrough': 'bg-purple-500',
        'Tips': 'bg-green-500',
        'Discussion': 'bg-orange-500',
        'Updates': 'bg-red-500',
      };

    const handleChange = (e) => {
        const { name, value } = e.target;  // Deconstruct the name and value from the target
        setPost((prev) => {
            return {
                ...prev,  // Spread the previous state. Arrow function requires a return statement
                [name]: value 
            }
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        let imageURL = '';

        if (file) {
            if (imagePreview !== '') {
                URL.revokeObjectURL(imagePreview);  // Cleanup the old URL on new image upload
            }
            imageURL = URL.createObjectURL(file);
        }

        setImage(file);
        setImagePreview(imageURL);
        setPost((prev) => {
            return {
                ...prev,
                image_path: `public/${uuid}.${file.name.split('.').pop()}`
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addImage();
        addPost(post);
    }

    const addImage = async () => {
        // No image to upload on post creation, return early
        if (image == '') {
            return;
        }
        if (!allowedTypes.includes(image.type)) {
            alert("File type not supported. Please upload a .jpeg, .jpg, .png, or .webp file.");
            return;
        }

        if (image.size > maxFileSize) {
            alert("File size too large. Please upload a file smaller than 50MB.");
            return;
        }

        try {
            const { data, error } = await supabase.storage
                .from('images_and_videos')
                .upload(`public/${uuid}.${image.name.split('.').pop()}`, image);
   
            if (error) {
                console.log("Error updating image: ", error);
            } else {
                console.log("Success updating image: ", data);
            }
        } catch (err) {
            console.log("Unexpected error uploading image: ", err);
        }
    }

    const removeImage = (e) => {
        e.preventDefault();
        setImage('');
        setImagePreview('');
        setPost((prev) => {
            return {
                ...prev,
                image_path: ''
            }
        });
        if (imagePreview !== '') {
            URL.revokeObjectURL(imagePreview); // Cleanup the URL of the imagePreview on removal
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }


    // Create an async function to send the data to the database
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

        window.location.href = '/';  // Redirect to the home page
    }

    // Create a function to handle tag selection
    const handleTagSelection = (e, clickedTag) => {
        e.preventDefault();

        // Case 1: Clicked on the active tag - set tag state variable to empty and remove from posts
        // Case 2: Clicked on a non-active tag while no active tag exists - set clicked tag as active tag in state variable
        // Case 3: Clicked on a non-active tag while an active tag exists - do nothing
        if (tag != '' && clickedTag == tag) {
            setTag('');
            setPost((prevState) => {
                return {...prevState, tag: ''};
            })
        } else if (tag == '' && clickedTag != tag) {
            setTag(clickedTag);
            setPost((prevState) => {
                return {...prevState, tag: clickedTag};
            });        
        } else {
            return;
        }
    }


    return(
        <div className='flex flex-col justify-between my-10 text-left w-11/12 sm:w-5/6 lg:w-1/2 2xl:w-1/3 max-w-5xl'>
            <h1 className='text-3xl font-bold'>Create New Post</h1>
            <form className='mx-auto w-full mt-10'>
                <div className="title-div mb-5 w-full">
                    <label htmlFor="title" className='block'>Title *</label>
                    <input type="text" className='mt-1 bg-background-card rounded-md w-full' required id="title" name="title" onChange={handleChange}/>
                </div>

                <div className='flex flex-col justify-center mb-5'>
                    <span>Post Category</span>
                    <div className='flex flex-wrap mt-2 gap-2'>
                        {tags.map((currentTag, index) => {
                            return (
                                // *Important: Rendering the different tag colors on clicks ONLY works in the conditional logic, not ouside. This is due to how Tailwind processes classes.
                                <button key={index} onClick={(event) => handleTagSelection(event,currentTag)} className={`flex ${tag != '' && tag == currentTag ? `${tagColorsMap[tag]}` : `bg-gray-700 hover:${tagColorsMap[currentTag]}`} px-3 py-1 rounded-full items-center justify-center font-medium hover:${tagColorsMap[currentTag]} transition-colors duration-200`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>
                                    {currentTag}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className='mb-5 flex flex-col'>
                    <label>Media</label>
                    <div className='flex justify-between'>
                        <div className="flex flex-wrap items-center gap-2 mt-1 font-medium">
                            <label className="cursor-pointer flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md px-2 py-1 border-2 border-gray-400">
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} ref={fileInputRef}/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload w-4 h-4 mr-2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" x2="12" y1="3" y2="15"></line>
                                </svg>
                                Upload image
                            </label>
                            {/* <button type="button" className="flex items-center justify-center  bg-gray-700 hover:bg-gray-600 rounded-md px-2 py-1 border-2 border-gray-400" title="Add image URL">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link w-4 h-4 mr-2">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                                Add URL
                            </button> */}
                        </div>
                        {imagePreview && <button onClick={removeImage}>X</button>}
                    </div>
                </div>

                {imagePreview !== '' && 
                    <div className='mb-5'><img src={imagePreview} alt="" /></div>    
                }

                <div className="mb-5 w-full">
                    <label htmlFor="description" className='block'>Content</label>
                    <textarea rows={7} type="text" className='mt-1 bg-background-card w-full rounded-md' id="description" name="description" onChange={handleChange}/>
                </div>

                <div className='w-full flex justify-end'>
                    <button type='submit' onClick={handleSubmit} className="bg-primary py-2 px-5 rounded-lg hover:bg-primary-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                        <span className='ml-1'>Create Post</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;