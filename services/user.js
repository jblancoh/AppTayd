import request from '../lib/request';

function storeDocuments(objDocument) {
    return request({
        url: 'users/upload_document',
        method: 'POST',
        data: objDocument
    });
}

const UserService = {
    storeDocuments,
}

export default UserService;