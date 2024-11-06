import { useParams } from "react-router-dom";

const EditPost = () => {
    const { post_id } = useParams();

    return(
        <h1>Edit Post With Id - {post_id}</h1>
    )
}

export default EditPost;