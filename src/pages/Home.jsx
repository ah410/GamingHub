import PostCard from '../components/PostCard';

const Home = ({posts, filteredPosts, searchValue}) => {
    return(
        <div className='w-full flex flex-col items-center mx-auto p-4'>
            <h1>Home Page!</h1>

            {
                searchValue !== '' ? (
                    filteredPosts && filteredPosts.map((post) => {
                        return <PostCard post={post} key={post.id}/>
                    })
                ) : (
                    posts && posts.map((post) => {
                        return <PostCard post={post} key={post.id} />
                    })
                )
            }
        </div>
    )
}

export default Home;