import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import { MdEdit } from "react-icons/md";
import ReactLoading from 'react-loading';

import { avatars } from "./avatars";
import axios from "axios";



const NAMES_REGEX = /^[a-zA-Z-]{1,30}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]{1,15}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,255}$/;



const Profile = () => {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const headers = {
        'x-access-token': user && user.token
    }

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user])

    const { t } = useTranslation();

    const [reactLoading, setReactLoading] = useState(false);

    const [profileNotif, setProfileNotif] = useState({
        display: false,
        type: '',
        msg: ''
    })



                                // PICTURE PROFILE SECTION
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    const [profilePicture, setProfilePicture] = useState('');

    const handleChangeAvatar = (e) => {
        setProfilePicture(e.target.id);
    }

    const handleSubmitProfilePicture = (e) => {
        e.preventDefault();
        setProfileNotif({
            display: false,
            type: '',
            msg: ''
        })

        if(avatars.includes(profilePicture)) {

            setReactLoading(true);
            axios.put('users/edit', {
                image: profilePicture
            }, { headers: headers }
            )
            .then( (response) => {
                
                const userUpdated = response.data.data;
                const newData = {
                    id: userUpdated.id,
                    lastname: userUpdated.lastname,
                    firstname: userUpdated.firstname,
                    username: userUpdated.username,
                    email: userUpdated.email,
                    image: userUpdated.image,
                    language: userUpdated.language,
                    token: user.token
                }
                dispatch({
                    type: "user/update",
                    payload: newData
                });
                localStorage.setItem('user', JSON.stringify(newData));
                setReactLoading(false);
                setProfileNotif({
                    display: true,
                    type: 'success',
                    msg: t('update_data')
                });
            })
            .catch( (error) => {
                console.log(error);
                setReactLoading(false);
                setProfileNotif({
                    display: true,
                    type: 'error',
                    msg: t('invalid_information')
                })
            })
        }
    }
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






                                // INFO PROFILE SECTION
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    const [profileData, setProfileData] = useState({
        lastname: '',
        firstname: '',
        username: '',
        email: ''
    })

    const handleProfileDataChange = (e) => {
        setProfileData({...profileData, [e.target.name]: e.target.value})
    }

    const handleSubmitProfileData = (e) => {
        e.preventDefault();
        setProfileNotif({
            display: false,
            type: '',
            msg: ''
        })

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
                setReactLoading(true);
                axios.put('users/edit', profileData,
                    { headers: headers }
                )
                .then( (response) => {
                    console.log(response.data.data);

                    const userUpdated = response.data.data;
                    const newData = {
                        id: userUpdated.id,
                        lastname: userUpdated.lastname,
                        firstname: userUpdated.firstname,
                        username: userUpdated.username,
                        email: userUpdated.email,
                        image: userUpdated.image,
                        language: userUpdated.language,
                        token: user.token
                    }
                    dispatch({
                        type: "user/update",
                        payload: newData
                    });
                    localStorage.setItem('user', JSON.stringify(newData));
                    setReactLoading(false);
                    setProfileNotif({
                        display: true,
                        type: 'success',
                        msg: t('update_data')
                    });
                })
                .catch( (error) => {
                    console.log(error.response.data.message);
                    if(error.response.data.message === 'ALREADY_REGISTERED_USERNAME') {
                        setProfileNotif({
                            display: true,
                            type: 'error',
                            msg: t('username_already_used')
                        })
                    }
                    else if(error.response.data.message === 'ALREADY_REGISTERED_EMAIL') {
                        setProfileNotif({
                            display: true,
                            type: 'error',
                            msg: t('email_already_used')
                        })
                    }
                    else {
                        setProfileNotif({
                            display: true,
                            type: 'error',
                            msg: t('invalid_information')
                        })
                    }
                    setReactLoading(false);
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
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






                                    // PASSWORD SECTION
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
});


const handlePasswordsChange = (e) => {
    setPasswords({...passwords, [e.target.name]: e.target.value})
}

const handleSubmitPasswords = (e) => {
    e.preventDefault();
    setProfileNotif({
        display: false,
        type: 'error',
        msg: ''
    })

    if (passwords.currentPassword !== '' &&
        passwords.newPassword !== '' &&
        passwords.confirmNewPassword !== '')
    {
        if (PASSWORD_REGEX.test(passwords.currentPassword) &&
            PASSWORD_REGEX.test(passwords.newPassword) &&
            passwords.newPassword === passwords.confirmNewPassword)
        {
            setReactLoading(true);
            axios.put('users/edit', { password: {
                currentPassword: passwords.currentPassword,
                password: passwords.newPassword
            } }, { headers: headers }
            )
            .then( (response) => {
                console.log(response);

                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                })
                setProfileNotif({
                    display: true,
                    type: 'success',
                    msg: t('update_data')
                });
                setReactLoading(false);
            })
            .catch( (error) => {
                console.log(error);
                setReactLoading(false);
                setProfileNotif({
                    display: true,
                    type: 'error',
                    msg: t('invalid_information')
                })
            })
        }
        else {
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


const passwordsInputs = [
    {
        id: 'currentPassword',
        label: t('current_password'),
        value: passwords.currentPassword,
        type: 'password',
        maxLength: "255"
    },
    {
        id: 'newPassword',
        label: t('new_password'),
        value: passwords.newPassword,
        type: 'password',
        maxLength: "255"
    },
    {
        id: 'confirmNewPassword',
        label: t('confirm_password'),
        value: passwords.confirmNewPassword,
        type: 'password',
        maxLength: "255"
    }
]

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






                            // LANGUAGE SECTION
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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

            setReactLoading(true);
            axios.put('users/edit', {
                language: favoriteLanguage.en ? 'en' : (favoriteLanguage.fr ? 'fr' : 'de')
            }, { headers: headers }
            )
            .then( (response) => {
                console.log(response);
                
                const userUpdated = response.data.data;
                const newData = {
                    id: userUpdated.id,
                    lastname: userUpdated.lastname,
                    firstname: userUpdated.firstname,
                    username: userUpdated.username,
                    email: userUpdated.email,
                    image: userUpdated.image,
                    language: userUpdated.language,
                    token: user.token
                }
                dispatch({
                    type: "user/update",
                    payload: newData
                });
                localStorage.setItem('user', JSON.stringify(newData));
                setReactLoading(false);
                setProfileNotif({
                    display: true,
                    type: 'success',
                    msg: t('update_data')
                });
            })
            .catch( (error) => {
                console.log(error);
                setReactLoading(false);
                setProfileNotif({
                    display: true,
                    type: 'error',
                    msg: t('invalid_information')
                })
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
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

    useEffect( () => {
        user &&
        setProfilePicture(
            user.image
        )
        user &&
        setProfileData({
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email
        })
        user &&
        setFavoriteLanguage({
            en: user.language === 'en' ? true : false,
            fr: user.language === 'fr' ? true : false,
            de: user.language === 'de' ? true : false
        })
    }, [user])


    const hideNotif = () => {
        setProfileNotif({
            display: false,
            type: '',
            msg: ''
        })
    }

    return (
        <div>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
            <Header />
            <div className="profile-cont">
                {
                    profileNotif.display &&
                    <div onClick={hideNotif} className={`profile-notif ${profileNotif.type}`}>{profileNotif.msg}</div>
                }
                <form className="profile-picture-form" onSubmit={handleSubmitProfilePicture}>
                    <div className='profile-picture-content'>
                        <div className='picture-content'>
                            <img src={profilePicture} alt='profile' className='profile-picture' />
                        </div>
                        {/* <label className="profile-picture-label" htmlFor='profilePicture'>
                            <MdEdit className='profile-picture-label-icon' /> */}
                            {/* <input onChange={null} type="file" id='profilePicture' className="profile-picture-input" /> */}
                        {/* </label> */}
                    </div>
                    <div className="avatars-content">
                        {
                            avatars.map((avatar, index) => {
                                return (
                                    <div
                                        key={index}
                                        id={avatar}
                                        onClick={handleChangeAvatar}
                                        className={`profile-avatars-content ${avatar === profilePicture && 'selected'}`}
                                    >
                                        <img className="profile-avatars" src={avatar} alt='avatar' />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button type='submit' className="button white profile-btn">{t('button_confirm')}</button>
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
                <form className="info-data-form" onSubmit={handleSubmitPasswords}>
                    {passwordsInputs.map( (data) => {
                        return (
                            <div key={data.id} className='info-block'>
                                <label>{data.label}</label>
                                <input
                                    type={data.type}
                                    name={data.id}
                                    placeholder='...'
                                    maxLength={data.maxLength}
                                    onChange={handlePasswordsChange}
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