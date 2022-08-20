import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie';
import axios from "axios";

import Header from "../Header/Header";
import Filter from "./Filter";
import Thumbnail from "./Thumbnail";







const Movies = () => {

    const { t } = useTranslation();

    const [filterSection, setFilterSection] = useState(false)

    const handleFilterSection = () => {
        setFilterSection(!filterSection);
    }

    const [movies, setMovies] = useState([])
    useEffect( () => {
        // axios.get(`https://imdb-api.com/${Cookies.get('i18next')}/API/MostPopularMovies/k_ds0uq7l5`)
        axios.get(`https://imdb-api.com/${Cookies.get('i18next')}/API/Top250Movies/k_ds0uq7l5`)
        .then( (response) => {
            setMovies(response.data.items);
        })
        .catch( (error) => {
        })
    }, [])

    const [movieYears, setMovieYears] = useState({ minimumValue: '1900', maximumValue: '2022' })
    const [movieRating, setMovieRating] = useState({ minimumValue: '0', maximumValue: '10' })

    const handleFilteringGenres = (e) => {
        console.log(e.target.value);
    }

    const handleFilteringYearsAndRating = () => {
        console.log("OK!");
    }

    const [reactLoading, setReactLoading] = useState(false);

    return (
        <Fragment>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
            <Header />
            <div className={`movies-content`}>
                <Filter
                    filterSection={filterSection}
                    handleFilterSection={handleFilterSection}
                    handleFilteringGenres={handleFilteringGenres}
                    handleFilteringYearsAndRating={handleFilteringYearsAndRating}
                    yearValues={movieYears}
                    setYearValues={setMovieYears}
                    ratingValues={movieRating}
                    setRatingValues={setMovieRating}
                />
                <div className={`thumbnails-content ${filterSection && 'blur'}`}>
                    <div className="search-bar-content">
                        <input type='text' placeholder={t('search')} className="search-bar" />
                    </div>

                    {movies.length > 0 && movies.slice(0, 30).map( (movie) => {
                        return (
                            <Thumbnail
                                key={movie.id}
                                id={movie.id}
                                picture={movie.image}
                                year={movie.year}
                                rating={movie.imDbRating}
                                vue={true}
                            />
                        )
                    })}

                </div>
            </div>
        </Fragment>
    )
}

export default Movies;