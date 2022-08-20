import React from "react";
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {FiLogOut} from 'react-icons/fi';
import {MdLocalMovies} from 'react-icons/md';
import {FaUsers} from 'react-icons/fa';

import logo from '../../images/hypertube.png';
import defaultUser from '../../../src/images/defaultUser.jpg';


const Header = () => {

    const { t } = useTranslation();


    const handleLogOut = () => {
        console.log("log out !");
    }

    return (
        <header className="header-user">
            <div className="header-user-left">
                <img src={logo} className='logo-header-user' alt='logo' />
                <NavLink to="/movies" className={(navData) => navData.isActive && window.location.pathname === '/movies' ? 'header-link actived' : 'header-link'}>
                    <MdLocalMovies className="link-icon"/>
                </NavLink>
                <NavLink to="/*" className={(navData) => navData.isActive ? 'header-link actived' : 'header-link'}>
                    <FaUsers className="link-icon"/>
                </NavLink>
            </div>
            <div className="language-signin-content">
                <NavLink to="/profile" className='navbar-pp-link'>
                    <div className='navbar-pp-content'>
                        <img src={defaultUser} alt='user' className='navbar-pp-img'/>
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