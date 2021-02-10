import config from '../config';

class AuthService {
    login = (token) => {
        localStorage.setItem('access_token', token);
        console.log('login function');
    };

    logout = () => {
        localStorage.removeItem('access_token');
    };
    isAuth = () => {
        let isAuth =
            localStorage.getItem('access_token') !== undefined &&
            localStorage.getItem('access_token') !== null;
        console.log('isauth function');
        return isAuth;
    };
}

export const authService = new AuthService();
