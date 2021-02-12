import {authService} from '../framework/auth';
import config from '../config';
import axios from 'axios';

export const login = (email, password) =>
    new Promise((resolve, reject) => {
        let url = `${config.API_ROOT_URL}`;
        let data = {
            email: email,
            password: password,
        };
        axios
            .post(url, data, false)
            .then((res) => {
                console.log(res.data);
                var token = res.data.access_token;
                authService.login(token); // call authservice.login to set token in localstorage
                resolve(res.data);
            })
            .catch((error) => {
                reject(error.response.statusText);
            });
    });

export const getData = (genre, id) =>
    new Promise((resolve, reject) => {
        let url = `https://api.themoviedb.org/3/discover/movie?${genre}=%7B${id}%7D&page=1&api_key=d38aa8716411ef7d8e9054b34a6678ac`;
        axios
            .get(url)
            .then((res) => {
                //console.log(res);
                let movieByGenre = {
                    genreName: genre,
                    list: res.data.results,
                    position: {
                        movie: 0,
                        genre: 0,
                        minDisplayedMovie: 0,
                        maxDisplayedMovie: 5,
                    },
                    minIndexMovie: 0,
                    maxIndexMovie: res.data.results.length,
                };
                resolve(movieByGenre);
            })
            .catch(function (res) {
                reject(res.data);
            });
    });
