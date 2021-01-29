import config from '../config';

class AuthService {
    // isAuth = () => {
    //     let isAuth = (localStorage.getItem(config.TOKEN) !== undefined
    //         && localStorage.getItem(config.TOKEN) !== null)
    //         || config.IS_DEV
    //     return isAuth;
    // }

    login = (token) => {
        localStorage.setItem('access_token', token);
    }

    logout = () => {
        localStorage.removeItem('access_token');
    }
};

export const authService = new AuthService();