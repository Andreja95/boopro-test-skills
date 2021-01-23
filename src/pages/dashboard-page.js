import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import {getData} from '../services/entity-service';
import genres from '../film-genres.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from '../assets/css/DashboardPage.module.css';
// import CardGroup from 'react-bootstrap/CardGroup';
// import Card from 'react-bootstrap/Card';
// import { Container, Row, Col } from 'react-bootstrap';
import MovieSliderByGenre from '../components/movieSliderByGenre';

export const DashboardPage = () => {

    const [moviesList, setMoviesList] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState({currentIndexMovie :0, minIndexMovie: 0, maxIndexMovie: selectedMovie.length})
    // const [selectedGenre, setSelectedGenre] = useState({currentIndexGenre :0, minIndexGenre: 0, maxIndexGenre: selectedGenre.length})
    const [currentSelectedMovie, setCurrentSelectedMovie] = useState(0); // trenutni film
    const [currentSelectedGenre, setCurrentSelectedGenre] = useState(0); // trenutni zanr

    const [minIndexMovie, setMinIndexMovie] = useState(0); // najmanji index filma u nizu zanra
    const [maxIndexMovie, setMaxIndexMovie] = useState(5); // najveci index filma u nizu zanra

    const [minDisplayedMovie, setMinDisplayedMovie] = useState(0); // najmanji prikazani film u zanru
    const [maxDisplayedMovie, setMaxDisplayedMovie] = useState(5); // najmanji prikazani film u zanru

 

    document.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
    
        if (e.keyCode == '38') {
            console.log('up');
            setCurrentSelectedGenre(currentSelectedGenre - 1);
        //    for(var i in moviesList[currentSelectedGenre]) {
        //        console.log(moviesList[currentSelectedGenre][i]) 
        //    }
          // console.log(currentSelectedGenre);
        }
        else if (e.keyCode == '40') {
            console.log('down');
            setCurrentSelectedGenre(currentSelectedGenre + 1);
        //    for(var i in moviesList[currentSelectedGenre]) {
        //        console.log(moviesList[currentSelectedGenre][i]) 
        //    }
        }
        else if (e.keyCode == '37') {
            console.log('left');
            setCurrentSelectedMovie(currentSelectedMovie - 1);
            
           if(currentSelectedMovie < minDisplayedMovie) { // ako je trenutno prikazani film manji od minimalnog prikazanog tj.ako ode u minus
            alert('prvi if');
                if(currentSelectedMovie < minIndexMovie) {
            alert('drugi if');
                    setCurrentSelectedMovie(currentSelectedMovie = maxIndexMovie);
                    setMaxDisplayedMovie(maxDisplayedMovie = maxIndexMovie);
                    setMinDisplayedMovie(minDisplayedMovie = maxDisplayedMovie - 5);
                } else {
            alert('else');
                    setMinDisplayedMovie(minDisplayedMovie = currentSelectedMovie);
                    setMaxDisplayedMovie(maxDisplayedMovie = minDisplayedMovie + 5);
                }   
           }

            // for(var i in moviesList[currentSelectedMovie]) {
            //     console.log(moviesList[currentSelectedMovie][i]) 
            // }
        }
        else if (e.keyCode == '39') {
           console.log('right');
           setCurrentSelectedMovie(currentSelectedMovie + 1);

        //     for(var i in moviesList[currentSelectedMovie]) {
        //         console.log(moviesList[currentSelectedMovie][i]) 
        //     }
        }
    
    }

    useEffect(() => {
        // call method for fetching data
        getMoviesList();
    }, []); //empty square bracket works like componentDidMount

    const getMoviesList = () => {
        let niz = [];
        for(var i in genres) {
            let genre = genres[i].name;
            let id = genres[i].id;
            // ovde imam informacije o tome koji je zanr u pitanju
            getData(genre, id)
            .then((res) => {
                //console.log(res);
                niz.push(res)
               //setMoviesList(niz);
               // ovde mi api vraca liste filmova
               setMoviesList(prevState => [...prevState, res] );
           
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    console.log(currentSelectedGenre);

    return (
    <body className={styles.wallpaper}>
        <div className="container-fluid h-100">
            
        {
            moviesList.length > 0 ?
            moviesList.map((moviesByGenre, indexGenre) =>
                <div className="row row-flex mx-auto">        
                <Carousel
                    className="carousel mt-0 multi-item-carousel"
                    key={indexGenre}
                    interval={null}
                    >
                        <h2>{moviesByGenre.genreName}-{indexGenre}</h2>
                        <div className="carousel-inner" style={{display:'flex'}}>
                        {/* proslediti joj movieByGenreList, currentMovieSelected */}
                     <MovieSliderByGenre genre={currentSelectedGenre} movie={currentSelectedMovie} movieByGenreList={moviesList[currentSelectedGenre].list} firstMovie={maxDisplayedMovie} lastMovie={minDisplayedMovie}/> 

                    {moviesByGenre.list.map((image, index2) => {
                        return (
                        // <Carousel.Item>
                        <div className="item col-2 px-0" key={index2}>
                        <span style={{color:'white'}}>{index2}</span>
                        <img
                        className="img-responsive"
                            draggable={false}
                            src={'https://image.tmdb.org/t/p/w500//'+image.poster_path}
                        />
                        </div>
                        // </Carousel.Item>
                        );
                    })}
                    </div>
                </Carousel>
                         
               </div>  
                    )
                    :
                    <div className="container item-file">
                        <p>Empty list</p>
                    </div>
        }
        </div>
    </body>
    )
}

// dodato!!!
export default DashboardPage;