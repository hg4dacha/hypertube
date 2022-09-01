import React, { useEffect, useState } from "react";
import { MdLanguage } from 'react-icons/md';


import i18n from "i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Cookies from 'js-cookie';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'de'],
    fallbackLng: "en",
    detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json'
    }
  });


const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    },
    {
        code: 'de',
        name: 'Deutsch',
        country_code: 'de'
    }
];


const Languages = () => {
    const [language, setLanguage] = useState('');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        switch (e.target.value) {
            case 'English':
                i18next.changeLanguage('en');
            break;
            case 'Français':
                i18next.changeLanguage('fr');
            break;
            case 'Deutsch':
                i18next.changeLanguage('de');
            break;
            default:
                i18next.changeLanguage('en');
        }
    }

    useEffect( () => {
        switch(Cookies.get('i18next')) {
            case 'en':
                setLanguage('English');
            break;
            case 'fr':
                setLanguage('Français');
            break;
            case 'de':
                setLanguage('Deutsch');
            break;
            default:
                setLanguage('English');
        }
    }, [])

    return (
        <div className="language-content">
            <MdLanguage className="language-logo" />
            <select value={language} onChange={handleLanguageChange} className="language-select">
                {
                    languages.map( (language) => {
                        return (
                            <option
                                key={language.code}
                                className="language-options"
                                value={language.name}
                            >
                                {language.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Languages;