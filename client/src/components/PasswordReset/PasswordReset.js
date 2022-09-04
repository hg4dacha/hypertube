import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import axios from "axios";

import logo from '../../images/hypertube.png';
import Languages from "../Languages/Languages";


const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,255}$/;


const PasswordReset = () => {

    const params = useParams();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [passwordResetForm, setPasswordResetForm] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });

    const [messageNotif, setMessageNotif] = useState({
        display: false,
        msg: '',
        type: ''
    });

    const handlePasswordResetForm = (e) => {
        setPasswordResetForm({...passwordResetForm, [e.target.name]: e.target.value});
    }

    const handlePasswordResetFormSubmit = (e) => {
        e.preventDefault();
        setMessageNotif({
            display: false,
            msg: '',
            type: ''
        });

        if (passwordResetForm.newPassword !== '' && passwordResetForm.confirmNewPassword !== '')
        {
            if (PASSWORD_REGEX.test(passwordResetForm.newPassword) &&
                passwordResetForm.newPassword === passwordResetForm.confirmNewPassword)
            {
                // A voir! car meme requete que le password de la page profile
                axios.put('users/password', {
                    newPassword: passwordResetForm.newPassword,
                    userId: params.userid,
                    tokenPassword: params.token
                })
                .then( (response) => {
                    console.log(response);
                    navigate('/login');
                })
                .catch( (error) => {
                    setMessageNotif({
                        display: true,
                        msg: t('invalid_information'),
                        type: 'error'
                    });
                })
            }
            else {
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
                    <h2 className="signin-tittle">{t('password_reset')}</h2>
                    <p className="forgotten-password-parag">{t('password_reset_paragraph')}</p>
                    <form onSubmit={handlePasswordResetFormSubmit} className='signup-form'>
                        <input value={passwordResetForm.newPassword} onChange={handlePasswordResetForm} type='password' className="signup-input" name='newPassword' placeholder={t('password')} autoComplete="off" />
                        <input value={passwordResetForm.confirmNewPassword} onChange={handlePasswordResetForm} type='password' className="signup-input" name='confirmNewPassword' placeholder={t('confirm_password')} autoComplete="off" />
                        <button className="button red weight signin-btn">{t('button_confirm')}</button>
                    </form>
                    <Link to='/login' className="forgotten-password">{t('cancel')}</Link>
                    {messageNotif.display && <div className={`sign-message-notif ${messageNotif.type}`}>{messageNotif.msg}</div>}
                </section>
            </div>
        </div>
    )
}

export default PasswordReset;