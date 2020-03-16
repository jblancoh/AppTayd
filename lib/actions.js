import { AsyncStorage } from 'react-native';

/**
 * USER DATA
 */
extractUserData = async () => {
    let result = null;

    try {
        let data = await AsyncStorage.getItem('user');
        let user = JSON.parse(data) || {};

        if (Object.getOwnPropertyNames(user).length > 0) {
            result = {
                user: user,
                access_token: await AsyncStorage.getItem('access_token'),
                expires_at: await AsyncStorage.getItem('expires_at')
            }
        }
    } catch (error) {
        console.error(error);
    }

    return result;
}

removeUserData = async () => {
    let result = false;

    try {
        AsyncStorage.removeItem('user');

        let data = await AsyncStorage.getItem('user');
        let user = JSON.parse(data) || {};

        if (Object.getOwnPropertyNames(user).length === 0) {
            AsyncStorage.removeItem('access_token');
            AsyncStorage.removeItem('expires_at');

            result = true;
        }
    } catch (error) {
        console.error(error);
    }

    return result;
}

validateUserData = async () => {
    let result = false;

    try {
        let data = await AsyncStorage.getItem('user');
        let user = JSON.parse(data) || {};

        if (Object.getOwnPropertyNames(user).length > 0) {
            result = true;
        }
    } catch (error) {
        console.error(error);
    }

    return result;
}

getFileMIMEType = (extension) => {
    let response = null;

    switch (extension) {
        case "doc":
        case "docx":
            response = "application/msword";
            break;
        case "jpg":
            response = "image/jpg";
            break;
        case "jpeg":
            response = "image/jpeg";
            break;
        case "png":
            response = "image/png";
            break;
        case "pdf":
            response = "application/pdf";
            break;
        case "xls":
        case "xlsx":
            response = "application/vnd.ms-excel";
            break;
    }

    return response;
}

const Actions = {
    extractUserData, removeUserData, validateUserData, getFileMIMEType
}

export default Actions;