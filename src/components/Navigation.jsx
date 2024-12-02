import { Link } from "react-router-dom";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import GameController from "./GameController";

const Navigation = ({ posts, setFilteredPosts, setSearchValue, setSortedPosts, session }) => {
    const navigate = useNavigate();

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

    const logout = () => {
        const signOut = async() => {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.log("Error signing out: ", error);
            } else {
                console.log("Success logging out!");

                // Redirect to login
                navigate('/login');
            }
        }
        signOut();
    }

    // Conditionally render the search bar and create post only if logged in
    return (
        <nav className="bg-primary flex justify-center items-center w-screen">
            {session && 
                <ul className="flex justify-between w-full">
                    <div className="flex items-center justify-center">
                        <li className="flex justify-center items-center ml-4">
                            <Link to='/' className="flex justify-center items-center">
                                <GameController/>
                                <div className="text-md sm:text-2xl font-medium">GameHub</div>
                            </Link>
                        </li>
                    </div>

                    <li className="flex justify-center items-center px-4 py-2 w-1/3">
                        <input 
                            className="rounded-full bg-background focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary w-full" 
                            type="text" 
                            placeholder="Search..."
                            onChange={(inputValue) => searchPosts(inputValue.target.value)}
                        />
                    </li>
                    
                    <div className="flex items-center justify-center mr-4 py-2">
                        <li>
                            <Link to='/create_post' className="flex items-center justify-center bg-secondary hover:bg-secondary-dark rounded-lg px-3 py-2 m-2 shadow-md transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <div>Create Post</div>
                            </Link>
                        </li>
                        <li>
                            <button className="flex items-center justify-center border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg px-3 py-2 transition-all" onClick={logout}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-1">
                                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>

                                <div>Logout</div>
                            </button>
                        </li>
                    </div>
                </ul>
            }
        </nav>

      );
};

export default Navigation;