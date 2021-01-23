import config from '../config';

class AuthService {
    isAuth = () => {
        let isAuth = (sessionStorage.getItem(config.TOKEN) !== undefined
            && sessionStorage.getItem(config.TOKEN) !== null)
            || config.IS_DEV
        return isAuth;
    }

    login = (token) => {
        sessionStorage.setItem(config.TOKEN, token);
    }

    logout = () => {
        sessionStorage.removeItem(config.TOKEN);
    }
};

export const authService = new AuthService();