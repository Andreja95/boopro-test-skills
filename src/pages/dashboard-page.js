import React, {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import {getData} from '../services/entity-service';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from '../assets/css/DashboardPage.module.css';
import MovieSliderByGenre from '../components/movieSliderByGenre';

export const DashboardPage = () => {
    const [moviesList, setMoviesList] = useState([]); // main list
    const [currentSelectedMovie, setCurrentSelectedMovie] = useState(0); // current movie
    const [currentSelectedGenre, setCurrentSelectedGenre] = useState(0); // current genre

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

            if (currentSelectedGenre < minIndexGenre) {
                // prelaz sa prvog na poslednji zanr
                setCurrentSelectedGenre(maxIndexGenre);
            }

            const minDisplayedMovieCurrent =
                moviesList[currentSelectedGenre].position.minDisplayedMovie; // najmanji index prikazanog filma u trenutnom zanru
            const movie = moviesList[currentSelectedGenre].position.movie; // index trenutnog filma u ovom zanru

            // * ideja (oduzeti movie-minDisplayedMovieCurrent) da bi se dobila pozicija trenutnog filma u trenutno prikazanim filmovima
            // * da se (movie-minDisplayedMovieCurrent) prosledi funkciji updateObjectNextGenre kao pozicija trenutnog filma u sledecem zanru
            // * nece moci samo preko index-a filmova pr: ako se ode unazad u drugom zanru, trenutni film ce biti najveci index u ovom zanru,
            // taj index moze biti veci od bilo kod prikazanog indeksa filmova u zanru iznad, i ako se gadja samo index filma onda nece moci da nadje taj film iznad vec ce da resetuje komponentu
            // * zato je ideja uzeti (movie-minDisplayedMovieCurrent) kao poziciju prikazanog filma

            const maxDisplayedMoviePrev =
                moviesList[currentSelectedGenre - 1].position.maxDisplayedMovie; // najveci index prikazanog filma u zanru iznad
            const minDisplayedMoviePrev =
                moviesList[currentSelectedGenre - 1].position.minDisplayedMovie; // najmanji index prikazanog filma u zanru iznad
            updateObjectNextGenre(
                movie - minDisplayedMovieCurrent,
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

            if (currentSelectedGenre > maxIndexGenre) {
                // prelaz sa poslednjeg na prvi zanr
                setCurrentSelectedGenre(minIndexGenre);
            }

            const minDisplayedMovie =
                moviesList[currentSelectedGenre].position.minDisplayedMovie; // najmanji index prikazanog filma u trenutnom zanru
            const movie = moviesList[currentSelectedGenre].position.movie; // trenutno prikazani film

            // ista logika kao za up arrow
            // (movie-minDisplayedMovie) pozicija filma u trenutnom zanru koja bi trebalo da se prenese na sledeci zanr

            const maxDisplayedMovieNext =
                moviesList[currentSelectedGenre + 1].position.maxDisplayedMovie; // najveci index prikazanog filma u zanru ispod
            const minDisplayedMovieNext =
                moviesList[currentSelectedGenre + 1].position.minDisplayedMovie; // najmanji index prikazanog filma u zanru ispod

            updateObjectNextGenre(
                movie - minDisplayedMovie,
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

            if (currentSelectedMovie < minIndexMovie) {
                // kretanje unazad kada se sa prvog filma ode na poslednji u tom zanru
                setCurrentSelectedMovie(maxIndexMovie);
                updateObject(
                    maxIndexMovie,
                    currentSelectedGenre,
                    maxIndexMovie - 5,
                    maxIndexMovie
                );
            } else if (currentSelectedMovie < minDisplayedMovie) {
                // kretanje kada se predje najmanji prikazani film
                updateObject(
                    currentSelectedMovie,
                    currentSelectedGenre,
                    currentSelectedMovie,
                    currentSelectedMovie + 5
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

            if (currentSelectedMovie > maxIndexMovie) {
                // kretanje u napred kada se sa poslednjeg filma predje na prvi u tom zanru
                setCurrentSelectedMovie(minIndexMovie);
                updateObject(
                    minIndexMovie,
                    currentSelectedGenre,
                    minIndexMovie,
                    minIndexMovie + 5
                );
            } else if (currentSelectedMovie > maxDisplayedMovie) {
                // kretanje kada se predje najveci prikazani film
                updateObject(
                    currentSelectedMovie,
                    currentSelectedGenre,
                    currentSelectedMovie - 5,
                    currentSelectedMovie
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
        }
    }

    useEffect(() => {
        getMoviesList();
    }, []);

    const getMoviesList = () => {
        axios.get('genres.json').then((res) => {
            console.log(res.data);
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
                <h4 style={{color: 'white'}}>
                    CurrentGenre: {currentSelectedGenre}
                </h4>
                <h4 style={{color: 'white'}}>
                    CurrentMovie: {currentSelectedMovie}
                </h4>

                {moviesList.length > 0 ? (
                    moviesList.map((moviesByGenre, indexGenre) => (
                        <div className='row row-flex mx-auto'>
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
