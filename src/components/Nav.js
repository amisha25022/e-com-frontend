import React from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/auth')
    }
    return (
        <div>  
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/update"> Update Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li> <Link onClick={logout} to="/auth">Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :<div style={{marginBottom:"3rem"}}></div>
            }


        </div>
    )
}

export default Nav;