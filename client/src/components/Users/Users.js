import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {FaUsers} from 'react-icons/fa';
import axios from "axios";

import Header from "../Header/Header";




const Users = () => {


    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user])

    const headers = {
        'x-access-token': user && user.token
    }

    const { t } = useTranslation();

    const [users, setUsers] = useState(false);

    useEffect( () => {

        axios.get('users', { headers: headers })
        .then( (response) => {
            setUsers(response.data.users);
        })
        .catch( (error) => {
            console.log(error)
        })

    // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Header />
            <div className="users-member-content">
                <FaUsers className="users-member-icon" />
                <h1 className="users-member-title">{t('member_list')}</h1>
                <div className="users-member-container">
                    {
                        users &&
                        users.map( (user, index) => {
                            return (
                                <div key={index} className='user-member-content'>
                                    <div className="user-member-picture-content">
                                        <img src={user.image} alt='user' className="user-member-picture" />
                                    </div>
                                    <div>
                                        <div className="user-member-info">{user.lastname}</div>
                                        <div className="user-member-info">{user.firstname}</div>
                                        <div className="user-member-info">{user.username}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Users;