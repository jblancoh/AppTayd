import { AsyncStorage } from 'react-native';
import axios from 'axios';
import env from './enviroment';

/**
 * Create an Axios client with defaults
 */
const client = axios.create({
    //baseURL: 'http://' + (Platform.OS === 'ios' ? 'localhost' : '10.0.2.2') + ':8000/api/',
    baseURL: env.serverAPI,
    headers: { Accept: 'application/json' },
});

client.defaults.headers.common['Content-Type']      = 'application/json';
client.defaults.headers.common['X-Requested-With']  = 'XMLHttpRequest';

client.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


/**
 * Request Wrapper with default success/error actions
 */

const request = function (options) {
    const onSuccess = function (response) {
        console.debug('Request Successful!', response);
        return response.data;
    }

    const onError = function (error) {
        console.error('Request Failed!', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status: ', error.response.status);
            console.error('Data: ', error.response.data);
            console.error('Headers: ', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message: ', error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;