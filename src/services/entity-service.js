import {http} from '../framework/api';
import {authService} from '../framework/auth';
import config from '../config';

export const login = (email, password) =>
    new Promise((resolve, reject) => {
        let url = `${config.API_ROOT_URL}`;
        let data = {
            email: email,
            password: password,
        };
        http('POST', url, data, false)
            .then(function (res) {
                console.log(res);
                var token = res.access_token;
                authService.login(token); // call authservice.login to set token to localstorage
                resolve(res);
            })
            .catch(function (res) {
                reject(res);
            });
    });

export const getData = (genre, id) =>
    new Promise((resolve, reject) => {
        let url = `https://api.themoviedb.org/3/discover/movie?${genre}=%7B${id}%7D&page=1&api_key=d38aa8716411ef7d8e9054b34a6678ac`;

        http('GET', url, '', false)
            .then(function (res) {
                let movieByGenre = {
                    genreName: genre,
                    list: res.results,
                    position: {
                        movie: 0,
                        genre: 0,
                        minDisplayedMovie: 0,
                        maxDisplayedMovie: 5,
                    },
                    minIndexMovie: 0,
                    maxIndexMovie: res.results.length,
                };
                resolve(movieByGenre);
            })
            .catch(function (res) {
                reject(res);
            });
    });
