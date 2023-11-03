import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
const styles = ({ isActive }) => ({ color: '#073B4C'});

const NavBar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
      };
    return <>
        <header>
            <nav>
                <NavLink to="/" style={styles}>Home</NavLink>
                <NavLink to="/account" style={styles}>Account</NavLink>
                <NavLink to="/" style={styles} onClick={handleLogout} id='logout'>Logout</NavLink>
            </nav>
            <Outlet/>
        </header>
        
    </>
};

export default NavBar;