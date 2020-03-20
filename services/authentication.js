import request from '../lib/request';

function login(user) {
    return request({
        url: 'auth/login',
        method: 'POST',
        data: user
    });
}

function signup(user) {
    return request({
        url: 'auth/signup',
        method: 'POST',
        data: user
    });
}

const AuthenticationService = {
    login, signup
}

export default AuthenticationService;