import { useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import Cookies from 'js-cookie';
import axios from 'axios';





export default function Oauth() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();

    useEffect( () => {
        if (user) navigate('/movies');
    }, [navigate, user])

    useEffect( () => {

        if (searchParams.get('id') && searchParams.get('key')) {

            axios.post('users/oauth', {
                omniauthId: searchParams.get('id'),
                accessKey: searchParams.get('key')
            })
            .then( (response) => {

                // add user data in redux
                dispatch({
                    type: "user/create",
                    payload: response.data.data
                })
                // add user data in local storage
                localStorage.setItem('user', JSON.stringify(response.data.data));
                i18next.changeLanguage(response.data.data.language);
                Cookies.set('accessKey', response.data.accessKey, { expires: 1, sameSite: 'strict' });
                navigate('/movies');

            })
            .catch( (error) => {
                navigate('/login?error=true');
            })

        } else {
            navigate('/login?error=true');
        }

    }, [searchParams, dispatch, navigate])

    return null
}