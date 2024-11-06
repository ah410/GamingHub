import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>GameHub</li>
                <li><input type="text" placeholder="Search..."/></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/create_post'>Create Post</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;