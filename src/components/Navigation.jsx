import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="nav-bar bg-primary flex fixed top-0 left-0 justify-center items-center w-full">
            <ul className="nav-ul flex">
                <li className="flex justify-center items-center p-4">GameHub</li>

                <li className="flex justify-center items-center p-4">
                    <input className="form-input rounded-full px-2 py-1 bg-background focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary" type="text" placeholder="Search..."/>
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