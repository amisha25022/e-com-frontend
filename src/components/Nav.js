import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeaderComponent/Header';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user ? user.name : "Amisha";
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/auth');
    };
    return (
        <div>
            {auth ?
                <ul className="nav-ul">
                    <Header
                        username={username}
                        logout={logout}
                    />
                </ul>
                : <div style={{ marginBottom: "3rem" }}></div>
            }
        </div>
    );
};

export default Nav;