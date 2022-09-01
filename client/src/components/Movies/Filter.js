import React from "react";
import { useTranslation } from "react-i18next";
import { IoClose, IoOptions } from 'react-icons/io5';
import { AiOutlineStar } from 'react-icons/ai';
import { CgCalendarTwo } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';

import Sliders from "./Sliders";





const Filter = ({
    filterSection,
    handleFilterSection,
    handleFilteringGenres,
    handleSubmitFilters,
    yearValues,
    setYearValues,
    ratingValues,
    setRatingValues,
    genreSelected,
    disabled
}) => {

    const { t } = useTranslation();

    return(
        <div className={`filter-section ${filterSection ? 'open' : 'close'}`}>
            <div className="open-filter-section-btn" onClick={handleFilterSection}>
                { filterSection ? <IoClose className="filter-logo" /> : <IoOptions className="filter-logo" /> }
            </div>
            <form onSubmit={handleSubmitFilters}>
                <div className="movies-genre-container">
                    {t('genre_list', { returnObjects: true }).map( (genre) => {
                        return (
                            <button
                                key={genre.id}
                                type='button'
                                value={genre.id}
                                className={`movies-genre ${genreSelected === genre.id && 'selected'}`}
                                onClick={handleFilteringGenres}
                            >
                                {genre.genre}
                            </button>
                        )
                    })}
                </div>
                <div className="sliders-content">
                    <Sliders
                        tittle={<CgCalendarTwo color="black"/>}
                        basicMinValue={1900}
                        basicMaxValue={2022}
                        step={1}
                        minValueID="minYear"
                        maxValueID="maxYear"
                        values={yearValues}
                        setValues={setYearValues}
                    />
                    <Sliders
                        tittle={<AiOutlineStar color="black"/>}
                        basicMinValue={0}
                        basicMaxValue={10}
                        step={1}
                        minValueID="minRating"
                        maxValueID="maxRating"
                        values={ratingValues}
                        setValues={setRatingValues}
                    />
                    <button type='submit' className="sliders-button" disabled={disabled}>
                        <BiSearch />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Filter;