import { useState } from 'react';
import PostCard from '../components/PostCard';
import { OrbitProgress } from 'react-loading-indicators';
import Login from './Login';

const Home = ({posts, filteredPosts, searchValue, sortedPosts, setSortedPosts, session, isLoading}) => {
    if (isLoading == true) {
        return (
            <div className="flex justify-center items-center h-screen">
            <OrbitProgress color="#3153cc" size="medium" />
            </div>
        )
    } else if (session === null) {
        return (
            <Login/>
        )
    }

    const [sortingConfig, setSortingConfig] = useState({orderType: null, ascending: true});

    const handleClick = (order_type) => {
        // 1. Grab the base arrray you want depending on the search value
        const sourceArray = searchValue !== '' ? filteredPosts : posts;

        // 2. Figure out which direction to sort. If order types match, make ascending opposite of what it currently is, else just make it true.
        const isAscending = sortingConfig.orderType === order_type ? !sortingConfig.ascending : true;

        // 3. Sort the array, this is the array you want to display
        const sorted = [...sourceArray].sort((post1, post2) => {
            if (order_type == 'created_at') {
                // Convert the date strings to Date objects for direct subtraction in order to sort
                return isAscending ? (new Date(post1['created_at']) - new Date(post2['created_at'])) : (new Date(post2['created_at']) - new Date(post1['created_at']));
            } else {
                return isAscending ? (post1['upvotes'] - post2['upvotes']) : (post2['upvotes'] - post1['upvotes']);
            }
        })

        // 4. Set the sorted posts state variable to the sorted array
        setSortedPosts(sorted);

        // 5. Config the sorting parameters for future clicks
        setSortingConfig({orderType: order_type, ascending: isAscending});
    }

    // 6. Determine which posts array to render based on sortedPosts and searchValue existsing or not
    const displayPosts = sortedPosts.length !== 0 ? sortedPosts : (searchValue !== '' ? filteredPosts : posts);

    return(
        <div className='flex flex-col items-center justify-center mx-auto w-11/12 sm:5/6 md:w-3/4 lg:w-1/2 mt-12'>
            <div className='w-full flex items-center'>
                <span>Order By: </span>
                <button onClick={() => handleClick('created_at')} className='bg-secondary rounded-lg p-2 m-2 hover:bg-secondary-dark'>Date Posted</button>
                <button onClick={() => handleClick('upvotes')} className='bg-secondary rounded-lg p-2 m-2 hover:bg-secondary-dark'>Upvotes</button>
            </div>

            {
                displayPosts && displayPosts.length !== 0 ? displayPosts.map((post) => {
                    return <PostCard post={post} key={post.id}/> 
                }) : 
                    searchValue == '' && <OrbitProgress color='#3153cc' size='medium'/>
            }
        </div>
    )
}

export default Home;