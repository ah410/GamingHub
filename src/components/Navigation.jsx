import { Link } from "react-router-dom";

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
        <nav className="nav-bar bg-primary flex fixed top-0 left-0 justify-center items-center w-full">
            <ul className="nav-ul flex">
                <li className="flex justify-center items-center p-4">GameHub</li>

                <li className="flex justify-center items-center p-4">
                    <input 
                        className="form-input rounded-full px-2 py-1 bg-background focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary" 
                        type="text" 
                        placeholder="Search..."
                        onChange={(inputValue) => searchPosts(inputValue.target.value)}
                    />
                </li>
                
                <li className="flex justify-center items-center p-4">
                    <Link to='/' className="nav-a  px-2 py-1">Home</Link>
                </li>
                
                <li className="flex justify-center items-center p-4">
                    <Link to='/create_post' className="nav-a flex  hover:bg-secondary rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <div>Create Post</div>
                    </Link>
                </li>
            </ul>
        </nav>
      );
};

export default Navigation;