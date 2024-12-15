import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";
import { v4 as uuidv4 } from 'uuid';

const EditPost = () => {
    const { post_id } = useParams();

    const [tagsAreActive, setTagsAreActive] = useState({'Guide': false, 'Walkthrough': false, 'Tips': false, 'Discussion': false, 'Updates': false});
    const tags = ['Guide', 'Walkthrough', 'Tips', 'Discussion', 'Updates'];

    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [uuid, setUuid] = useState(uuidv4());
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxFileSize = 50 * 1024 * 1024; // 50MB

    const [ postDetails, setPostDetails ] = useState({title: '', description: '', tag: '', image_path: ''});

    // Grab the post details on first render
    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', post_id);

        if (error) {
            console.log("Error fetching post: ", error);
        } else {
            console.log("Success fetching post: ", data);
            setPostDetails({title: data[0].title, description: data[0].description, tag: data[0].tag, image_path: data[0].image_path});
        
            // If there is an existing image path, set the uuid to the image path to override the default uuid and set the form's input image input field
            if (data[0].image_path !== '') {
                setUuid(data[0].image_path.split('/')[1].split('.')[0]);
                setPreviewFromExistingPath(data);
                setImagePath(data[0].image_path);
            }
        }
    }

    const setPreviewFromExistingPath = async (data) => {
        // Fetch image from url, convert to blob, then to a file
        const existingImageURL = await getPublicURL(data[0].image_path);
        const response = await fetch(existingImageURL);
        const blob = await response.blob();
        const file = new File([blob], uuid, {type: blob.type});

        // Set the image from file and preview image source being the image url
        setImage(file);
        setImagePreview(existingImageURL);
    }
    const getPublicURL = async (imagePath) => {
        const { data } = supabase.storage
            .from('images_and_videos')
            .getPublicUrl(imagePath);
                
        return data.publicUrl + '?t=' + new Date().getTime();
    }


    // Handle changes for title and description
    const handleChange = (e) => {
        const {name, value} = e.target; // Destructure event.target to grab the name and value of the DOM element
        setPostDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }
    // Handle changes for image
    const handleImageChange = (e) => {
        const file = e.target.files[0];  // Grab the first file from the file input and set it to Image state variable
        const imageURL = URL.createObjectURL(file);
        
        setImage(file);
        setImagePreview(imageURL);

        let newImageFilePath = `public/${uuid}.${file.name.split('.').pop()}`;
        if (postDetails.image_path !== '') {
            // Setting the image path to the path in the database if post already has an image
            setPostDetails((prevState) => {
                return {
                    ...prevState, 
                    image_path: postDetails.image_path
                }
            });
        } else {
            // Setting the image path to the new image path if post doesn't have an image
            setPostDetails((prevState) => {
                return {
                    ...prevState, 
                    image_path: newImageFilePath
                }
            });
        }
    }
    // Handle tag changes
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

    const handlePostUpdate = async (e) => {
        e.preventDefault();
        updateImage();
        updatePost();
    }
    const updateImage = async () => {
        if (image !== '' && !isImageValid(image)) {
            return;
        } else {
            handleImageUpload();
        }
    }
    const updatePost = async () => {
        if (postDetails.title === '') {
            alert("Please enter a title.");
            return;
        } 

        const { data, error } = await supabase
            .from('posts')
            .update(postDetails)
            .eq('id', post_id)
            .select();

        if (error) {
            console.log("Error updating post: ", error);
        } else {
            console.log("Success updating post: ", data);
        }

        window.location.href = '/';
    }

    const isImageValid = (image) => {
        if (!allowedTypes.includes(image.type)) {
            alert("File type not supported. Please upload a .jpeg, .jpg, .png, or .webp file.");
            return false;
        }
        if (image.size > maxFileSize) {
            alert("File size too large. Please upload a file smaller than 50MB.");
            return false;
        }
        return true;
    }
    const handleImageUpload = async () => {
        // CASE 1: formImage is empty and imagepath exists. DELETE IMAGE and IMAGEPATH.
        // CASE 2: formImage is empty and imagepath doesn't exists. DO NOTHING.
        // CASE 3: formImage not empty and imagepath exists. UPDATE IMAGE ON STORAGE.
        // CASE 4: formImage not empty and imagepath doesn't exist. UPLOAD IMAGE. 
        try {
            let newFilePath = '';
            if (image !== '') {
                newFilePath = `public/${uuid}.${image.name.split('.').pop()}`;
            }
    
            const { data, error } = (image === '' && imagePath !== '')
                ? await supabase.storage.from('images_and_videos').remove([imagePath]) && console.log("Removing image")
                : imagePath === '' 
                    ? await supabase.storage.from('images_and_videos').upload(newFilePath, image) && console.log("Uploading image") 
                    : await supabase.storage.from('images_and_videos').update(postDetails.image_path, image) && console.log("Updating image") ;
    
            if (error) {
                console.log("Error handling image: ", error);
            } else {
                console.log("Success handling image: ", data);
            }
    
        } catch (err) {
            console.log("Unexpected error: ", err);
        }
    }

    // When you click the X button to remove the image preview
    const removeImage = (e) => {
        e.preventDefault();
        setImage('');
        setImagePreview('');
        setPostDetails((prevState) => {
            return {
                ...prevState,
                image_path: ''
            }
        });
    }

    const handlePostDeletion = async (e) => {
        e.preventDefault();
        deleteImage();
        deletePost();
    }
    const deleteImage = async () => {
        if (postDetails.image_path === '') {
            return;
        } else {
            const { data, error } = await supabase.storage
                .from('images_and_videos')
                .remove([postDetails.image_path])
            
            if (error) {
                console.log("Error deleting image: ", error);
            } else {
                console.log("Success deleting image: ", data);
            }
        }
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

        window.location.href = '/';
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

                <div className='mb-5 flex flex-col'>
                    <label>Media</label>
                    <div className='flex justify-between'>
                        <div className="flex flex-wrap items-center gap-2 mt-1 font-medium">
                            <label className="cursor-pointer flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md px-2 py-1 border-2 border-gray-400">
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
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

                { imagePreview !== '' &&
                    <div className="mb-5"><img src={imagePreview} alt="" /></div>    
                }

                <div className="description-div mb-5">
                    <label htmlFor="description" className='block'>Description</label>
                    <textarea rows={7} type="text" className='mt-1 bg-background-card rounded-md w-full' id="description" name="description" value={postDetails.description} onChange={handleChange}/>
                </div>

                <div className="flex items-center justify-end">
                    <button type='submit' onClick={handlePostDeletion} className="bg-accent p-3 mr-4 rounded-lg hover:bg-accent-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-4 h-4 mr-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                        <span>Delete</span>
                    </button>
                    <button type='submit' onClick={handlePostUpdate} className="bg-primary p-3 rounded-lg hover:bg-primary-dark flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save w-4 h-4 mr-2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;