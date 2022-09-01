import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {FiLogOut} from 'react-icons/fi';
import {MdLocalMovies} from 'react-icons/md';
import {FaUsers} from 'react-icons/fa';

import logo from '../../images/hypertube.png';


const Header = () => {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState('');

    const handleLogOut = () => {
        dispatch({
            type: "user/reset"
        })
        localStorage.removeItem('user');
        navigate('/login');
    }

    useEffect( () => {
        user &&
        setProfilePicture(user.image);
    }, [user])

    return (
        <header className="header-user">
            <div className="header-user-left">
                <img src={logo} className='logo-header-user' alt='logo' />
                <NavLink to="/movies" className={(navData) => navData.isActive && window.location.pathname === '/movies' ? 'header-link actived' : 'header-link'}>
                    <MdLocalMovies className="link-icon"/>
                </NavLink>
                <NavLink to="/users" className={(navData) => navData.isActive ? 'header-link actived' : 'header-link'}>
                    <FaUsers className="link-icon"/>
                </NavLink>
            </div>
            <div className="language-signin-content">
                <NavLink to="/profile" className='navbar-pp-link'>
                    <div className='navbar-pp-content'>
                        <img src={profilePicture} alt='user' className='navbar-pp-img'/>
                    </div>
                </NavLink>
                <button className="logout-btn" onClick={handleLogOut}>
                    <FiLogOut className="logout-btn-logo"/>
                </button>
            </div>
        </header>
    )
}

export default Header;