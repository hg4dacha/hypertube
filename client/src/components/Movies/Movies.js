import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie';
import { BiSearch } from 'react-icons/bi';
import axios from "axios";

import Header from "../Header/Header";
import Filter from "./Filter";
import Thumbnail from "./Thumbnail";







const Movies = () => {

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user])

    const { t } = useTranslation();

    const [movies, setMovies] = useState([])
    const [queryResults, setQueryResults] = useState([])

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

    const [movieYears, setMovieYears] = useState({ minimumValue: '1900', maximumValue: '2022' })

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

        const filterData = {
            genre: genre,
            minYear: movieYears.minimumValue,
            maxYear: movieYears.maximumValue,
            minRating: movieRating.minimumValue,
            maxRating: movieRating.maximumValue
        }

        const imdbKey = 'k_ds0uq7l5';
        
        const filterUrl = `https://imdb-api.com/API/AdvancedSearch/${imdbKey}?title_type=feature&user_rating=${filterData.minRating},${filterData.maxRating}&release_date=${filterData.minYear}-01-01,${filterData.maxYear}-12-31&genres=${filterData.genre}&countries=us&sort=alpha,asc&count=250`;

        const filterResults = [];

        axios.get(filterUrl)
        .then( (response) => {
            response.data.results.map( (result) => {
                    return (
                    filterResults.push({
                        id: result.id,
                        title: result.title,
                        image: result.image,
                        year: result.description.replace(/\D/g, "").slice(0,4),
                        imDbRating: ''
                    })
                )
            })
            setQueryResults(filterResults);
            setMovies(filterResults.slice(0,50));
            setReactLoading(false);
            setDisabled(false);

        })
        .catch( (error) => {
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

            const searchData = {
                search: search
            }

            const imdbKey = 'k_ds0uq7l5';

            const searchUrl = `https://imdb-api.com/${Cookies.get('i18next')}/API/SearchMovie/${imdbKey}/${searchData.search}`;

            const searchResults = [];

            axios.get(searchUrl)
            .then( (response) => {
                response.data.results.map( (result) => {
                    return (
                        searchResults.push({
                            id: result.id,
                            title: result.title,
                            image: result.image,
                            year: result.description.replace(/\D/g, "").slice(0,4),
                            imDbRating: ''
                        }))
                })
                setMovies(searchResults);
                setReactLoading(false);
                setDisabled(false);
            })
            .catch( (error) => {
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

        axios.get(`https://imdb-api.com/${Cookies.get('i18next')}/API/Top250Movies/k_ds0uq7l5`)
        .then( (response) => {
            setQueryResults(response.data.items);
            setMovies(response.data.items.slice(0,50));
            setReactLoading(false);
        })
        .catch( (error) => {
            if (axios.isCancel(error)) return;
            setReactLoading(false);
        })

        // axios.get(`https://imdb-api.com/${Cookies.get('i18next')}/API/MostPopularMovies/k_ds0uq7l5`)
        // .then( (response) => {
        //     setMovies(prevState => [...prevState, ...response.data.items]);
        //     setReactLoading(false);
        // })
        // .catch( (error) => {
        //     setReactLoading(false);
        // })

        return () => {
            setMovies([]);
        }

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

                    {movies.length > 0 && movies.map( (movie, index) => {
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
                                    vue={true}
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
                                    vue={true}
                                />
                            )
                        }
                    })}

                </div>
            </div>
        </Fragment>
    )
}

export default Movies;