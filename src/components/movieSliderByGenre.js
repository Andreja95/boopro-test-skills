import React, {useEffect, useState} from 'react';
import styles from '../assets/css/MovieSliderByGenre.module.css';

export const movieSliderByGenre = ({
    movie,
    movieByGenreList,
    isCurrent,
    position,
}) => {
    var minDisplayedMovie = position.minDisplayedMovie;
    var maxDisplayedMovie = position.maxDisplayedMovie;
    var currentMovie = false;

    return (
        <div className='movieSliderByGenre row w-100'>
            {movieByGenreList.map((image, index) => {
                if (index >= minDisplayedMovie && index <= maxDisplayedMovie) {
                    if (movie === index && isCurrent) {
                        currentMovie = true;
                    } else {
                        currentMovie = false;
                    }
                    return (
                        <div
                            className={`item col-2 px-0 mx-0 ${
                                currentMovie ? styles.currentItem : null
                            }`}
                            key={index}>
                            <img
                                className='img-responsive'
                                draggable={false}
                                src={
                                    'https://image.tmdb.org/t/p/w500//' +
                                    image.poster_path
                                }
                            />
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default movieSliderByGenre;
