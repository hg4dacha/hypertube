import React, { useState } from "react";
import Header from "../Header/Header";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { MdEdit } from "react-icons/md";
import ReactLoading from 'react-loading';
import axios from "axios";

import defaultUser from '../../../src/images/defaultUser.jpg';



const NAMES_REGEX = /^[a-zA-Z-]{1,30}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]{1,15}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/;


const Profile = () => {

    const { t } = useTranslation();

    const [profileNotif, setProfileNotif] = useState({
        display: false,
        type: '',
        msg: ''
    })



    const [profileData, setProfileData] = useState({
        lastname: 'Dupont',
        firstname: 'Jean',
        username: 'Juju-568',
        email: 'jean-dupont@test.com'
    })

    const handleProfileDataChange = (e) => {
        setProfileData({...profileData, [e.target.name]: e.target.value})
    }

    const handleSubmitProfileData = (e) => {
        e.preventDefault();

        if(profileData.lastname !== '' &&
           profileData.firstname !== '' &&
           profileData.username !== '' &&
           profileData.email !== '')
           {
            if(NAMES_REGEX.test(profileData.lastname) &&
               NAMES_REGEX.test(profileData.firstname) &&
               USERNAME_REGEX.test(profileData.username) &&
               EMAIL_REGEX.test(profileData.email))
            {
                setProfileNotif({
                    display: true,
                    type: 'success',
                    msg: t('update_data')
                })
            } else {
                setProfileNotif({
                    display: true,
                    type: 'error',
                    msg: t('invalid_information')
                })
               }
           }
           else {
            setProfileNotif({
                display: true,
                type: 'error',
                msg: t('incomplete_fields')
            })
           }
    }

    const infoInputs = [
        {
            id: 'lastname',
            label: t('lastname'),
            value: profileData.lastname,
            type: 'text',
            maxLength: "30"
        },
        {
            id: 'firstname',
            label: t('firstname'),
            value: profileData.firstname,
            type: 'text',
            maxLength: "30"
        },
        {
            id: 'username',
            label: t('username'),
            value: profileData.username,
            type: 'text',
            maxLength: "15"
        },
        {
            id: 'email',
            label: t('email'),
            value: profileData.email,
            type: 'email',
            maxLength: "250"
        }
    ]





    const [favoriteLanguage, setFavoriteLanguage] = useState({
        en: true,
        fr: false,
        de: false
    })

    const handleFavoriteLanguageChange = (e) => {
        const newFavoriteLanguage = {
            en: e.target.id === 'en' ? true : false,
            fr: e.target.id === 'fr' ? true : false,
            de: e.target.id === 'de' ? true : false
        }
        setFavoriteLanguage(newFavoriteLanguage);
    }

    const handleSubmitFavoriteLanguage = (e) => {
        e.preventDefault();
        setProfileNotif({
            display: false,
            type: '',
            msg: ''
        })

        if((favoriteLanguage.en === true && (favoriteLanguage.fr === false && favoriteLanguage.de === false)) ||
           ((favoriteLanguage.fr === true && (favoriteLanguage.en === false && favoriteLanguage.de === false))) ||
           (favoriteLanguage.de === true && (favoriteLanguage.en === false && favoriteLanguage.fr === false)))
        {
            if(favoriteLanguage.en === true) {
                i18next.changeLanguage('en');
            }
            else if(favoriteLanguage.fr === true) {
                i18next.changeLanguage('fr');
            }
            else if(favoriteLanguage.de === true) {
                i18next.changeLanguage('de');
            }
            setProfileNotif({
                display: true,
                type: 'success',
                msg: t('update_data')
            })
        }
        else {
            setProfileNotif({
                display: true,
                type: 'error',
                msg: t('occured_error')
            })
        }
    }

    const languagesInputs = [
        {
            id: 'en',
            value:'English',
            checked: favoriteLanguage.en
        },
        {
            id: 'fr',
            value:'Français',
            checked: favoriteLanguage.fr
        },
        {
            id: 'de',
            value:'Deutsch',
            checked: favoriteLanguage.de
        }
    ]

    const [reactLoading, setReactLoading] = useState(false);

    return (
        <div>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
            <Header />
            <div className="profile-cont">
                {
                    profileNotif.display &&
                    <div className={`profile-notif ${profileNotif.type}`}>{profileNotif.msg}</div>
                }
                <form className="profile-picture-form">
                    <div className='profile-picture-content'>
                        <div className='picture-content'>
                            <img src={defaultUser} alt='profile' className='profile-picture' />
                        </div>
                        <label className="profile-picture-label" htmlFor='profilePicture'>
                            <MdEdit className='profile-picture-label-icon' />
                            <input onChange={null} type="file" id='profilePicture' className="profile-picture-input" />
                        </label>
                    </div>
                    <button className="button white profile-btn">{t('button_confirm')}</button>
                </form>
                <hr className="profile-hr"/>
                <form className="info-data-form" onSubmit={handleSubmitProfileData}>
                    {infoInputs.map( (data) => {
                        return(
                            <div key={data.id} className='info-block'>
                                <label>{data.label}</label>
                                <input
                                    type={data.type}
                                    name={data.id}
                                    placeholder='...'
                                    maxLength={data.maxLength}
                                    onChange={handleProfileDataChange}
                                    value={data.value}
                                    autoComplete="off"
                                    className='info-profile-input'
                                />
                            </div>
                        )
                    })}
                    <button type='submit' className="button white profile-btn">{t('button_confirm')}</button>
                </form>
                <hr className="profile-hr"/>
                <form className='languages-form' onSubmit={handleSubmitFavoriteLanguage}>
                    <div className="languages-profile-content">
                        {languagesInputs.map( (data) => {
                            return (
                                <div key={data.id}>
                                    <input
                                        type="radio"
                                        id={data.id}
                                        name="languages"
                                        value={data.value}
                                        checked={data.checked}
                                        onChange={handleFavoriteLanguageChange}
                                    />
                                    <label htmlFor={data.id} style={{cursor: 'pointer'}}>
                                        {data.value}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <button type='submit' className="button white profile-btn">{t('button_confirm')}</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;