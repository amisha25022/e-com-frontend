import PropTypes from 'prop-types';
import './Header.css';
import { useEffect, useRef } from 'react';
import React from 'react';

const Header = ({
    username,
    colour_change,
    title,
    title1,
    children,
    handleOpen,
    logout
}) => {

    const getInitialLetter = name => {
        return name?.charAt(0).toUpperCase();
    };

    const [open, setOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (typeof handleOpen === 'function') {
            handleOpen();
        }
    }, [open, handleOpen]);

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleIconOpen = () => {
        setOpen(!open);
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div id="header" className="header-container">
            <div id="title-container" className="title-container">
                <span id="heading" className="page-title">{title}</span>
                <div id="breadcrumb" className="router">
                    {title1}
                    <span className="colour_change">{colour_change}</span>
                </div>
            </div>
            <div id="user-info" className="user-info" ref={dropdownRef}>
                <div className="user-icon" onClick={handleIconOpen}>
                    <span className="icon-text">{getInitialLetter(username)}</span>
                </div>
                <div id="username" className="username-text">
                    <span>{username}</span>
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
            {open ? children : null}
        </div>
    );
};

Header.propTypes = {
    username: PropTypes.string.isRequired,
    colour_change: PropTypes.string,
    title: PropTypes.string,
    title1: PropTypes.string,
    children: PropTypes.node,
    handleOpen: PropTypes.func,
    logout: PropTypes.func.isRequired
};

Header.defaultProps = {
    handleOpen: () => { }
};

export default Header;
