import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import { BiSearch } from 'react-icons/bi';
import axios from "axios";

import Header from "../Header/Header";
import Filter from "./Filter";
import Thumbnail from "./Thumbnail";
import noResult from '../../images/no-result.png';







const Movies = () => {

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user])

    const headers = {
        'x-access-token': user && user.token
    }

    const { t } = useTranslation();

    const [movies, setMovies] = useState(false);
    const [queryResults, setQueryResults] = useState([]);
    const [moviesViewed, setMoviesViewed] = useState([]);

    const [disabled, setDisabled] = useState(false)

    const [reactLoading, setReactLoading] = useState(false)

    const [addMovies, setAddMovies] = useState(false);
    useEffect( () => {
         if (addMovies) {
            if (movies.length < queryResults.length)
            {
                setReactLoading(true);
                const moreMovies = [];
                for(let i = movies.length; i < (movies.length + 50); i++)
                {
                    if (i === queryResults.length)
                    {
                        break;
                    }
                    moreMovies.push(queryResults[i]);
                }
                setMovies(prev => [...prev, ...moreMovies]);
                setReactLoading(false);
            }
            setAddMovies(false);
         }
    }, [addMovies, movies.length, queryResults])

    const observer = useRef();
    const lastMovieElementRef = useCallback(node => {
        if (reactLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setAddMovies(true);
            }
        })
        if (node) observer.current.observe(node);
    }, [reactLoading])




                            // FILTERS
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    const [filterSection, setFilterSection] = useState(false)

    const handleFilterSection = () => {
        setFilterSection(!filterSection);
    }

    const [movieYears, setMovieYears] = useState({ minimumValue: '1980', maximumValue: '2022' })

    const [movieRating, setMovieRating] = useState({ minimumValue: '0', maximumValue: '10' })

    const [genre, setGenre] = useState('');
    
    const handleFilteringGenres = (e) => {
        e.stopPropagation()

        setGenre(e.target.value);
    }
    
    const handleSubmitFilters = (e) => {
        e.preventDefault();
        setReactLoading(true);
        setFilterSection(false);
        setDisabled(true);

        axios.get(`movies?genre=${genre}&minRating=${movieRating.minimumValue}&maxRating=${movieRating.maximumValue}&minYear=${movieYears.minimumValue}&maxYear=${movieYears.maximumValue}`, { headers: headers })
        .then( (response) => {
            setQueryResults(response.data.movies);
            setMovies(response.data.movies.slice(0,50));
            setReactLoading(false);
            setDisabled(false);
        })
        .catch( (error) => {
            setMovies([]);
            if(axios.isCancel(error)) return;
            setReactLoading(false);
            setDisabled(false);
        })
    }
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*




                            // SEARCH BAR
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    const [search, setSearch] = useState('');

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        if (search !== '')
        {
            setReactLoading(true);
            setDisabled(true);

            axios.get(`movies?search=${search}`, { headers: headers })
            .then( (response) => {
                setQueryResults(response.data.movies);
                setMovies(response.data.movies.slice(0,50));
                setReactLoading(false);
                setDisabled(false);
            })
            .catch( (error) => {
                setMovies([]);
                if(axios.isCancel(error)) return;
                setReactLoading(false);
                setDisabled(false);
            })
        }
    }

    const handleSearchBarChange = (e) => {
        setSearch(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !disabled) {
            handleSubmitSearch(e);
        }
    }
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*





                            // MOVIES
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
    useEffect( () => {

        setReactLoading(true);

        axios.get('movies', { headers: headers })
        .then( (response) => {
            setQueryResults(response.data.movies);
            setMovies(response.data.movies.slice(0,50));
            setMoviesViewed(response.data.moviesViewed);
            setReactLoading(false);
        })
        .catch( (error) => {
            setMovies([]);
            if(axios.isCancel(error)) return;
            setReactLoading(false);
        })
        
    // eslint-disable-next-line
    }, [])
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*


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
                    handleSubmitFilters={handleSubmitFilters}
                    yearValues={movieYears}
                    setYearValues={setMovieYears}
                    ratingValues={movieRating}
                    setRatingValues={setMovieRating}
                    genreSelected={genre}
                    disabled={disabled}
                />
                <div className={`thumbnails-content ${filterSection && 'blur'}`}>
                    <div className="search-bar-content">
                        <form onSubmit={handleSubmitSearch} className='search-bar-form'>
                            <input type='text' value={search} onChange={handleSearchBarChange} onKeyDown={handleKeyDown} placeholder={t('search')} disabled={disabled} className="search-bar" />
                            <button type='submit' disabled={disabled} className="search-button">
                                <BiSearch size={20} />
                            </button>
                        </form>
                    </div>

                    {
                        movies.length === 0 ?
                        <div className='no-result'>
                            <img src={noResult} alt='no-result-icon' className='no-result-icon' />
                            Aucun résultat
                        </div> :
                        movies !== false && movies.map( (movie, index) => {
                            if (movies.length === index + 1) {
                                return (
                                    <Thumbnail
                                        lastMovieElementRef={lastMovieElementRef}
                                        key={index}
                                        id={movie.id}
                                        title={movie.title}
                                        picture={movie.image}
                                        year={movie.year}
                                        rating={movie.imDbRating}
                                        vue={moviesViewed.includes(movie.id)}
                                    />
                                )
                            }
                            else {
                                return (
                                    <Thumbnail
                                        key={index}
                                        id={movie.id}
                                        title={movie.title}
                                        picture={movie.image}
                                        year={movie.year}
                                        rating={movie.imDbRating}
                                        vue={moviesViewed.includes(movie.id)}
                                    />
                                )
                            }
                        })
                    }

                </div>
            </div>
        </Fragment>
    )
}

export default Movies;