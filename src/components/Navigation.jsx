import { Link } from "react-router-dom";
import mario from '../assets/mario.gif';

const Navigation = ({ posts, setFilteredPosts, setSearchValue, setSortedPosts }) => {
    // 1. Make a function to filter
    const searchPosts = (searchInput) => {
        // ANYTIME you search, you want to reset the sortedPosts back to an empty list
        setSortedPosts([]);

        setSearchValue(searchInput);

        if (searchInput !== '') {
            // Filter posts variable, filter() makes a new list
            const filteredResults = posts.filter((post) => post.title.toLowerCase().includes(searchInput.toLowerCase()));

            // Set the value of the filtered posts
            setFilteredPosts(filteredResults);
        } else {
            setFilteredPosts(posts);
        }
    }

    return (
        <nav className="bg-primary flex justify-center items-center w-screen">
            <ul className="flex justify-between w-full">
                <div className="flex items-center justify-center">
                    <li className="flex justify-center items-center p-4">👾 GameHub 👾</li>
                    <img src={mario} alt="" width={90} className="rounded-lg p-1" />
                </div>

                <li className="flex justify-center items-center p-4">
                    <input 
                        className="rounded-full bg-background focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary" 
                        type="text" 
                        placeholder="Search..."
                        onChange={(inputValue) => searchPosts(inputValue.target.value)}
                    />
                </li>
                
                <div className="flex items-center justify-center p-4">
                    <li className="flex justify-center items-center">
                        <Link to='/' className="px-4 py-2 hover:bg-secondary rounded-full">Home</Link>
                    </li>
                    
                    <li className="flex justify-center items-center">
                        <Link to='/create_post' className="flex bg-secondary hover:bg-secondary-dark rounded-lg px-3 py-2 m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <div>Create Post</div>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
      );
};

export default Navigation;