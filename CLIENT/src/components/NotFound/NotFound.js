import React from "react";
import logo from '../../images/hypertube.png';
import {TbError404, TbFaceIdError} from 'react-icons/tb';

const NotFound = () => {
    return (
        <div className='home-content'>
            <header className="home-header">
                <img src={logo} className='logo' alt='logo' />
            </header>
            <div className="not-found-content">
                <TbFaceIdError size={200} />
                <TbError404 size={200} />
            </div>
        </div>
    )
}

export default NotFound;