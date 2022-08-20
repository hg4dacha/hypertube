import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

import logo from '../../images/hypertube.png';
import Languages from "../Languages/Languages";


const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/;


const ForgottenPassword = () => {

    const { t } = useTranslation();

    const [signinForm, setSigninForm] = useState({
        email: ''
    });

    const [messageNotif, setMessageNotif] = useState({
        display: false,
        msg: '',
        type: ''
    });

    const handleSigninFormChange = (e) => {
        setSigninForm({...signinForm, [e.target.name]: e.target.value});
    }

    const handleSigninFormSubmit = (e) => {
        e.preventDefault();
        setMessageNotif({
            display: false,
            msg: '',
            type: ''
        });

        if (signinForm.email !== '')
        {
            if (EMAIL_REGEX.test(signinForm.email))
            {

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
                msg: t('incomplete_fields'),
                type: 'error'
            });
        }
    }

    return (
        <div className='home-content'>
            <header className="home-header">
                <img src={logo} className='logo' alt='logo' />
                <div className="language-signin-content">
                    <Languages />
                </div>
            </header>
            <div className="signin-content">
                <section className="signin-section">
                    <h2 className="signin-tittle">{t('forgotten_password')}</h2>
                    <p className="forgotten-password-parag">{t('forgotten_password_paragraph')}</p>
                    <form onSubmit={handleSigninFormSubmit} className='signup-form'>
                        <input value={signinForm.email} onChange={handleSigninFormChange} type='text' className="signup-input" name='email' placeholder={t('email')} autoComplete="off" />
                        <button className="button red weight signin-btn">{t('button_confirm')}</button>
                    </form>
                    <Link to='/login' className="forgotten-password">{t('cancel')}</Link>
                    {messageNotif.display && <div className={`sign-message-notif ${messageNotif.type}`}>{messageNotif.msg}</div>}
                </section>
            </div>
        </div>
    )
}

export default ForgottenPassword;