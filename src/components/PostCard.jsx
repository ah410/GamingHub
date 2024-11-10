import { useNavigate } from "react-router-dom";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

const PostCard = ({ post }) => {
    // Initialize the navigate hook
    const navigate = useNavigate();

    // Handle click functionality when a user clicks on a post
    const handleClick = () => {
        navigate('/post/' + post.id, { state: { post: post } });
    }

    return (
        <div className="flex flex-col my-4 bg-primary w-full rounded-lg cursor-pointer hover:bg-primary-dark" onClick={handleClick}>
            <div className="posted-date p-2 flex justify-between">
                <span className="">Post created at {post.created_at}</span>
                {/*Conditionally render tags if exist*/
                post.tags ? post.tags.map((tag, index) => {
                    return (
                        <span key={index} className="tag">{tag}</span>
                    )
                    }) : null
                }
            </div>

            <div className="header flex justify-between">
                <h2 className="p-2">Title: {post.title}</h2>
            </div>

            <div className="stats flex justify-between">
                <div className="likes p-2 flex">
                    <span className="mr-4 flex items-center">
                        <svg rpl="" fill="currentColor" height="16" icon-name="upvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
                        </svg>

                        <span>{post.upvotes}</span>
                    </span>
                    <span className="flex items-center">
                        <span>
                            <svg rpl="" fill="currentColor" height="16" icon-name="downvote-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1c.072 0 .145 0 .218.006A4.1 4.1 0 0 1 14 5.184V9h3.138a1.751 1.751 0 0 1 1.234 2.993L10.59 19.72a.836.836 0 0 1-1.18 0l-7.782-7.727A1.751 1.751 0 0 1 2.861 9H6V5.118a4.134 4.134 0 0 1 .854-2.592A3.99 3.99 0 0 1 10 1Zm0 17.193 7.315-7.264a.251.251 0 0 0-.177-.429H12.5V5.184A2.631 2.631 0 0 0 10.136 2.5a2.441 2.441 0 0 0-1.856.682A2.478 2.478 0 0 0 7.5 5v5.5H2.861a.251.251 0 0 0-.176.429L10 18.193Z"></path>
                            </svg>
                        </span>
                        
                        <span>{post.downvotes}</span>
                    
                    </span>
                </div>

                <div className="comments-div flex p-2">
                    <span><ChatBubbleOvalLeftIcon className="size-6"/></span>
                    <span>{post.comments}</span>
                </div>
            </div>
        </div>
    );
};

/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
</svg>
*/

export default PostCard;