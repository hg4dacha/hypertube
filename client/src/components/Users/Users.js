import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {FaUsers} from 'react-icons/fa';

import Header from "../Header/Header";


const usersList = [
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/655352758863402.svg?backgroundColor=%23FFFF99',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/666200122851125.svg?backgroundColor=%23E6B333',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/156410818583639.svg?backgroundColor=%23B34D4D',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17628617998533.svg?backgroundColor=%2366991A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/561648701770521.svg?backgroundColor=%23FF1A66',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/906069449321170.svg?backgroundColor=%23B3B31A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/330158979429162.svg?backgroundColor=%2300E680',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17177583007367.svg?backgroundColor=%23F5F5F5',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/362068599067877.svg?backgroundColor=%23E6FF80',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/345511053472022.svg?backgroundColor=%23FF3380',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/31479210647026.svg?backgroundColor=%234D80CC',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/655352758863402.svg?backgroundColor=%23FFFF99',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/666200122851125.svg?backgroundColor=%23E6B333',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/156410818583639.svg?backgroundColor=%23B34D4D',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17628617998533.svg?backgroundColor=%2366991A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/561648701770521.svg?backgroundColor=%23FF1A66',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/906069449321170.svg?backgroundColor=%23B3B31A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/330158979429162.svg?backgroundColor=%2300E680',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17177583007367.svg?backgroundColor=%23F5F5F5',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/362068599067877.svg?backgroundColor=%23E6FF80',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/345511053472022.svg?backgroundColor=%23FF3380',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/156410818583639.svg?backgroundColor=%23B34D4D',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17628617998533.svg?backgroundColor=%2366991A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/561648701770521.svg?backgroundColor=%23FF1A66',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/906069449321170.svg?backgroundColor=%23B3B31A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/330158979429162.svg?backgroundColor=%2300E680',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17177583007367.svg?backgroundColor=%23F5F5F5',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/362068599067877.svg?backgroundColor=%23E6FF80',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/345511053472022.svg?backgroundColor=%23FF3380',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/31479210647026.svg?backgroundColor=%234D80CC',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/655352758863402.svg?backgroundColor=%23FFFF99',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/666200122851125.svg?backgroundColor=%23E6B333',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/156410818583639.svg?backgroundColor=%23B34D4D',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17628617998533.svg?backgroundColor=%2366991A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/561648701770521.svg?backgroundColor=%23FF1A66',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/906069449321170.svg?backgroundColor=%23B3B31A',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/330158979429162.svg?backgroundColor=%2300E680',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/17177583007367.svg?backgroundColor=%23F5F5F5',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/362068599067877.svg?backgroundColor=%23E6FF80',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    },
    {
        userId: Math.random(),
        image: 'https://avatars.dicebear.com/api/bottts/345511053472022.svg?backgroundColor=%23FF3380',
        lastname: "Dupont",
        firstname: "Xavier",
        username: "user-432423",
    }
]


const Users = () => {

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user])

    const { t } = useTranslation();

    const [users, setUsers] = useState(false);

    useEffect( () => {
        setUsers(usersList);
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
                        users.map( (user) => {
                            return (
                                <div key={user.userId} className='user-member-content'>
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