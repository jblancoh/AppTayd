import request from '../lib/request';

function login(user) {
    return request({
        url: 'auth/login',
        method: 'POST',
        data: user
    });
}

const AuthenticationService = {
    login
}

export default AuthenticationService;