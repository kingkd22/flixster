import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <nav className='sidebar'>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/watched">Watched</Link>
        </nav>
    )
}

export default SideBar