import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';

import logo from '../../images/hypertube.png';
import Languages from "../Languages/Languages";



const NAMES_REGEX = /^[a-zA-Z-]{1,30}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]{1,15}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,255}$/;



const Home = () => {

    const { t } = useTranslation();

    const [reactLoading, setReactLoading] = useState(false);

    const [signupForm, setSignupForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirm: ''
    });

    const handleSignupFormChange = (e) => {
        setSignupForm({...signupForm, [e.target.name]: e.target.value});
    }

    const [messageNotif, setMessageNotif] = useState({
        display: false,
        msg: '',
        type: ''
    });

    const handleSignupFormSubmit = (e) => {
        e.preventDefault();
        setMessageNotif({
            display: false,
            msg: '',
            type: ''
        });

        if (signupForm.lastname !== '' &&
            signupForm.firstname !== '' &&
            signupForm.username !== '' &&
            signupForm.email !== '' &&
            signupForm.password !== ''
            && signupForm.confirm !== '')
        {
            if (EMAIL_REGEX.test(signupForm.email))
            {
                if (NAMES_REGEX.test(signupForm.lastname) &&
                    NAMES_REGEX.test(signupForm.firstname) &&
                    USERNAME_REGEX.test(signupForm.username) &&
                    PASSWORD_REGEX.test(signupForm.password) &&
                    signupForm.password === signupForm.confirm)
                {
                    setReactLoading(true);
                    axios.post("users/add", signupForm)
                    .then( response => {

                        console.log(response.data);
                        setSignupForm({
                            firstname: '',
                            lastname: '',
                            username: '',
                            email: '',
                            password: '',
                            confirm: ''
                        })
                        setMessageNotif({
                            display: true,
                            msg: t('registered'),
                            type: 'success'
                        });
                    })
                    .catch( error => {
                        console.log(error.response.data.message);
                        setMessageNotif({
                            display: true,
                            msg: t('invalid_information'),
                            type: 'error'
                        });
                    })
                    setReactLoading(false);
                } else {
                    setMessageNotif({
                        display: true,
                        msg: t('invalid_information'),
                        type: 'error'
                    });
                }
            } else {
                setMessageNotif({
                    display: true,
                    msg: t('invalid_email'),
                    type: 'error'
                });
            }
        } else {
            setMessageNotif({
                display: true,
                msg: t('incomplete_fields'),
                type: 'error'
            });
        }
    }

    return (
        <div className='home-content'>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
            <header className="home-header">
                <img src={logo} className='logo' alt='logo' />
                <div className="language-signin-content">
                    <Languages />
                    <Link to='/login' className="button red">{t('sign_in')}</Link>
                </div>
            </header>
            <section className="signin-section">
                <h2 className="signup-tittle">{t('sign_up')}</h2>
                <form onSubmit={handleSignupFormSubmit} className='signup-form'>
                    <input value={signupForm.lastname} onChange={handleSignupFormChange} type='text' className="signup-input" name='lastname' placeholder={t('lastname')} autoComplete="off" />
                    <input value={signupForm.firstname} onChange={handleSignupFormChange} type='text' className="signup-input" name='firstname' placeholder={t('firstname')} autoComplete="off" />
                    <input value={signupForm.username} onChange={handleSignupFormChange} type='text' className="signup-input" name='username' placeholder={t('username')} autoComplete="off" />
                    <input value={signupForm.email} onChange={handleSignupFormChange} type='text' className="signup-input" name='email' placeholder={t('email')} autoComplete="off" />
                    <input value={signupForm.password} onChange={handleSignupFormChange} type='password' className="signup-input" name='password' placeholder={t('password')} autoComplete="off" />
                    <input value={signupForm.confirm} onChange={handleSignupFormChange} type='password' className="signup-input" name='confirm' placeholder={t('confirm_password')} autoComplete="off" />
                    <button className="button red weight signin-btn">{t('button_confirm')}</button>
                    {messageNotif.display && <div className={`sign-message-notif ${messageNotif.type}`}>{messageNotif.msg}</div>}
                </form>
            </section>
        </div>
    )
}

export default Home;