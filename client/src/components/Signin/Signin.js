import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie';

import logo from '../../images/hypertube.png';
import Languages from "../Languages/Languages";
import logo_42 from "../../images/42.png"
import logo_github from "../../images/github.png"
import axios from "axios";



const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})){1,255}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,255}$/;




const Signin = () => {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/movies');
    }, [navigate, user])

    const { t } = useTranslation();

    const [reactLoading, setReactLoading] = useState(false);

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
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

        if (signinForm.email !== '' &&
            signinForm.password !== '')
        {
            if (EMAIL_REGEX.test(signinForm.email) && PASSWORD_REGEX.test(signinForm.password))
            {
                setReactLoading(true);
                axios.post("users/auth", signinForm)
                .then( response => {
                    // add user data in redux
                    dispatch({
                        type: "user/create",
                        payload: response.data.data
                    })
                    // add user data in local storage
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    i18next.changeLanguage(response.data.data.language);
                    Cookies.set('accessKey', response.data.accessKey, { expires: 1, sameSite: 'strict' });
                    setSigninForm({
                        email: '',
                        password: ''
                    });
                    setReactLoading(false);
                    navigate('/movies');
                })
                .catch( error => {
                    console.log(error.response.data.message);
                    setReactLoading(false);
                })
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

    const [messageNotif, setMessageNotif] = useState({
        display: false,
        msg: '',
        type: ''
    });

    const fortyTwoStrategy = () => {
        window.location.replace('http://localhost:5000/auth/42');
    }

    const gitHubStrategy = () => {
        window.location.replace('http://localhost:5000/auth/github');
    }


    return (
        <div className='home-content'>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
            <header className="home-header">
                <img src={logo} className='logo' alt='logo' />
                <div className="language-signin-content">
                    <Languages />
                    <Link to='/' className="button red">{t('sign_up')}</Link>
                </div>
            </header>
            <div className="signin-content">
                <section className="signin-section">
                    <h2 className="signin-tittle">{t('sign_in')}</h2>
                    <form onSubmit={handleSigninFormSubmit} className='signup-form'>
                        <input value={signinForm.email} onChange={handleSigninFormChange} type='text' className="signup-input" name='email' placeholder={t('email')} autoComplete="off" />
                        <input value={signinForm.password} onChange={handleSigninFormChange} type='password' className="signup-input" name='password' placeholder={t('password')} autoComplete="off" />
                        <button className="button red weight signin-btn">{t('button_confirm')}</button>
                    </form>
                    <div className="omniauth-content">
                        <hr className="hr-omniauth" />
                        <div className="omniauth-btn-content">
                            <button onClick={fortyTwoStrategy} className="button white omniauth-btn ft">
                                <img src={logo_42} alt='logo_42' className="logo-omniauth-42" />
                            </button>
                            <button onClick={gitHubStrategy} className="button black omniauth-btn gh">
                                <img src={logo_github} alt='logo_github' className="logo-omniauth-gh" />
                            </button>
                        </div>
                    </div>
                    <Link to='/forgotten-password' className="forgotten-password">{t('forgotten_password')}</Link>
                    {messageNotif.display && <div className={`sign-message-notif ${messageNotif.type}`}>{messageNotif.msg}</div>}
                </section>
            </div>
        </div>
    )
}

export default Signin;