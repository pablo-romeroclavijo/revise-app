import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const styles = ({ isActive }) => ({ color: isActive ? '#2B061E' : '#875053'});

const NavBar = () => {
    return <>
        <header>
            <nav>
                <NavLink to="/" style={styles}>Home</NavLink>
                <NavLink to="/snacks" style={styles}>Account</NavLink>
            </nav>
            <Outlet/>
        </header>
        <footer>CalendarApp</footer>
    </>
};

export default NavBar;