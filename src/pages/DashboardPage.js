import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import {getData} from '../services/entity-service';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from '../styles/pages/DashboardPage.module.css';
import MovieSliderByGenre from '../components/MovieSlider/MovieSliderByGenre';

export const DashboardPage = () => {
    const [moviesList, setMoviesList] = useState([]); // main list
    const [currentSelectedMovie, setCurrentSelectedMovie] = useState(0); // current movie
    const [currentSelectedGenre, setCurrentSelectedGenre] = useState(0); // current genre
    const stateRefMovie = useRef();
    stateRefMovie.current = currentSelectedMovie;
    const stateRefMovie2 = useRef();
    stateRefMovie2.current = stateRefMovie.current;
    const stateRefGenre = useRef();
    stateRefGenre.current = currentSelectedGenre;

    const [darkMode, setDarkMode] = useState(false);

    function updateObject(movie, genre, minDisplayedMovie, maxDisplayedMovie) {
        // funkcija za azuriranje objekta (child komponente) kada se ide kroz filmove
        let position = {
            movie: movie,
            genre: genre,
            minDisplayedMovie: minDisplayedMovie,
            maxDisplayedMovie: maxDisplayedMovie,
        };

        let tempMovieList = [...moviesList];
        tempMovieList[currentSelectedGenre]['position'] = position;
        setMoviesList(tempMovieList);
    }

    function updateObjectNextGenre(
        movie,
        genre,
        minDisplayedMovie,
        maxDisplayedMovie
    ) {
        // funkcija za azuriranje objekta (child komponente) kada se ide kroz zanrove
        let position = {
            movie: movie, // trenutni film
            genre: genre, // trenutni zanr
            minDisplayedMovie: minDisplayedMovie, // minimalni prikazani film
            maxDisplayedMovie: maxDisplayedMovie, // maksimalni prikazani film
        };

        let tempMovieList = [...moviesList];
        tempMovieList[genre]['position'] = position;
        setMoviesList(tempMovieList);
    }

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
            e.preventDefault();
            console.log('up');
            setCurrentSelectedGenre(currentSelectedGenre - 1);
            const minIndexGenre = 0; // najmanji index zanra
            const maxIndexGenre = moviesList.length - 1; // najveci index zanra

            if (stateRefGenre.current < minIndexGenre) {
                // prelaz sa prvog na poslednji zanr
                setCurrentSelectedGenre(maxIndexGenre);
            }

            const minDisplayedMovieCurrent =
                moviesList[currentSelectedGenre].position.minDisplayedMovie; // najmanji index prikazanog filma u trenutnom zanru
            const movie = moviesList[currentSelectedGenre].position.movie; // index trenutnog filma u ovom zanru

            const maxDisplayedMoviePrev =
                moviesList[currentSelectedGenre - 1].position.maxDisplayedMovie; // najveci index prikazanog filma u zanru iznad
            const minDisplayedMoviePrev =
                moviesList[currentSelectedGenre - 1].position.minDisplayedMovie; // najmanji index prikazanog filma u zanru iznad

            // console.log('minDisplayedMoviePrev ' + minDisplayedMovieCurrent);
            // console.log('stateRefGenre.current ' + stateRefMovie2.current);
            setCurrentSelectedMovie(
                minDisplayedMoviePrev +
                    (stateRefMovie2.current - minDisplayedMovieCurrent)
            );

            updateObjectNextGenre(
                minDisplayedMoviePrev +
                    (stateRefMovie2.current - minDisplayedMovieCurrent),
                currentSelectedGenre - 1,
                minDisplayedMoviePrev,
                maxDisplayedMoviePrev
            );
        } else if (e.keyCode == '40') {
            e.preventDefault();
            console.log('down');

            setCurrentSelectedGenre(currentSelectedGenre + 1);
            const minIndexGenre = 0; // najmanji index zanra
            const maxIndexGenre = moviesList.length - 1; // najveci index zanra

            if (stateRefGenre.current > maxIndexGenre) {
                // prelaz sa poslednjeg na prvi zanr
                setCurrentSelectedGenre(minIndexGenre);
            }

            const minDisplayedMovie =
                moviesList[currentSelectedGenre].position.minDisplayedMovie; // najmanji index prikazanog filma u trenutnom zanru
            const movie = moviesList[currentSelectedGenre].position.movie; // trenutno prikazani film

            const maxDisplayedMovieNext =
                moviesList[currentSelectedGenre + 1].position.maxDisplayedMovie; // najveci index prikazanog filma u zanru ispod
            const minDisplayedMovieNext =
                moviesList[currentSelectedGenre + 1].position.minDisplayedMovie; // najmanji index prikazanog filma u zanru ispod
            // console.log('movie: ' + movie);
            // console.log('minDisplayedMovie: ' + minDisplayedMovie);
            // console.log('maxDisplayedMovieNext: ' + maxDisplayedMovieNext);
            // console.log('minDisplayedMovieNext: ' + minDisplayedMovieNext);

            // console.log('minDisplayedMovieNext ' + minDisplayedMovieNext);
            // console.log('stateRefMovie.current2 ' + stateRefMovie2.current);
            // console.log('minDisplayedMovie ' + minDisplayedMovie);

            setCurrentSelectedMovie(
                minDisplayedMovieNext +
                    (stateRefMovie2.current - minDisplayedMovie)
            );

            updateObjectNextGenre(
                minDisplayedMovieNext +
                    (stateRefMovie2.current - minDisplayedMovie),
                currentSelectedGenre + 1,
                minDisplayedMovieNext,
                maxDisplayedMovieNext
            );
        } else if (e.keyCode == '37') {
            e.preventDefault();
            console.log('left');
            setCurrentSelectedMovie(currentSelectedMovie - 1);

            const minIndexMovie =
                moviesList[currentSelectedGenre].minIndexMovie; // najmanji index filma u tom zanru
            const maxIndexMovie =
                moviesList[currentSelectedGenre].maxIndexMovie; // najveci index filma u tom zanru
            const minDisplayedMovie =
                moviesList[currentSelectedGenre].position.minDisplayedMovie; // najmanji prikazani film u tom zanru

            if (stateRefMovie.current < minIndexMovie) {
                // kretanje unazad kada se sa prvog filma ode na poslednji u tom zanru
                setCurrentSelectedMovie(maxIndexMovie);
                updateObject(
                    maxIndexMovie,
                    currentSelectedGenre,
                    maxIndexMovie - 5,
                    maxIndexMovie
                );
            } else if (stateRefMovie.current < minDisplayedMovie) {
                // kretanje kada se predje najmanji prikazani film
                updateObject(
                    stateRefMovie.current,
                    currentSelectedGenre,
                    stateRefMovie.current,
                    stateRefMovie.current + 5
                );
            } else {
                updateObject(
                    stateRefMovie.current,
                    currentSelectedGenre,
                    minDisplayedMovie,
                    minDisplayedMovie + 5
                );
            }
        } else if (e.keyCode == '39') {
            e.preventDefault();
            console.log('right');
            setCurrentSelectedMovie(currentSelectedMovie + 1);
            const minIndexMovie =
                moviesList[currentSelectedGenre].minIndexMovie; // najmanji index filma u tom zanru
            const maxIndexMovie =
                moviesList[currentSelectedGenre].maxIndexMovie; // najveci index filma u tom zanru
            const maxDisplayedMovie =
                moviesList[currentSelectedGenre].position.maxDisplayedMovie; // najveci prikazani film u tom zanru
            // console.log(currentSelectedMovie);
            // console.log(maxDisplayedMovie);
            // console.log('stateRefMovie.current: ' + stateRefMovie.current);

            if (stateRefMovie.current > maxIndexMovie) {
                // kretanje u napred kada se sa poslednjeg filma predje na prvi u tom zanru
                setCurrentSelectedMovie(minIndexMovie);
                updateObject(
                    minIndexMovie,
                    currentSelectedGenre,
                    minIndexMovie,
                    minIndexMovie + 5
                );
            } else if (stateRefMovie.current > maxDisplayedMovie) {
                // kretanje kada se predje najveci prikazani film
                updateObject(
                    stateRefMovie.current,
                    currentSelectedGenre,
                    stateRefMovie.current - 5,
                    stateRefMovie.current
                );
            } else {
                // kretanje u prvom trenutku izmedju 1 i 6.og filma
                updateObject(
                    currentSelectedMovie,
                    currentSelectedGenre,
                    maxDisplayedMovie - 5,
                    maxDisplayedMovie
                );
            }
        } else if (e.keyCode == '13') {
            setDarkMode(true);
        } else if (e.keyCode == '27') {
            setDarkMode(false);
        }
    }

    useEffect(() => {
        getMoviesList();
    }, []);

    const getMoviesList = () => {
        axios.get('genres.json').then((res) => {
            res.data.map(function (val) {
                let genre = val.name;
                let id = val.id;
                getData(genre, id)
                    .then((res) => {
                        setMoviesList((prevState) => [...prevState, res]);
                    })
                    .catch((error) => {
                        //console.log(error);
                    });
            });
        });
    };

    console.log(moviesList);

    return (
        <body className={styles.wallpaper}>
            <div
                className='container-fluid h-100'
                style={{flexWrap: 'wrap', display: 'flex'}}>
                {/* <h4 style={{color: 'white'}}>
                    CurrentGenre: {currentSelectedGenre}
                </h4>
                <h4 style={{color: 'white'}}>
                    CurrentMovie: {currentSelectedMovie}
                </h4> */}

                {moviesList.length > 0 ? (
                    moviesList.map((moviesByGenre, indexGenre) => (
                        <div className='row row-flex mx-auto'>
                            {/* <h3>genre: {moviesByGenre.position.genre}/</h3>
                            <h3>movie: {moviesByGenre.position.movie}/</h3>
                            <h3>
                                maxDisplay:{' '}
                                {moviesByGenre.position.maxDisplayedMovie}/
                            </h3>
                            <h3>
                                minDisplay:{' '}
                                {moviesByGenre.position.minDisplayedMovie}/
                            </h3> */}

                            <Carousel
                                className='carousel mt-0 multi-item-carousel'
                                key={indexGenre}
                                interval={null}
                                controls={false}>
                                <h2 style={{color: 'E1DDDF'}}>
                                    {moviesByGenre.genreName}
                                </h2>
                                <div
                                    className='carousel-inner'
                                    style={{display: 'flex'}}>
                                    <MovieSliderByGenre
                                        movie={currentSelectedMovie}
                                        movieByGenreList={
                                            moviesList[indexGenre].list
                                        }
                                        isCurrent={
                                            currentSelectedGenre == indexGenre
                                        }
                                        position={
                                            moviesList[indexGenre].position
                                        }
                                        darkMode={darkMode}
                                    />
                                </div>
                            </Carousel>
                        </div>
                    ))
                ) : (
                    <div className='container item-file'>
                        <p>Empty list</p>
                    </div>
                )}
            </div>
        </body>
    );
};

export default DashboardPage;
