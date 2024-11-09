const Home = ({posts}) => {
    return(
        <div>
            <h1>Home Page!</h1>
            {posts && posts.map((post) => {
                return (
                    <div key={post.id} className="flex flex-col mb-5">
                        <h2>Title: {post.title}</h2>
                        <p>Description: {post.description}</p>
                        <p>Upvotes: {post.upvotes}</p>
                        <p>Downvotes: {post.downvotes}</p>
                        <p>Comments: {post.comments}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Home;