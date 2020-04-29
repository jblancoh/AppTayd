import request from '../lib/request';

function get(id) {
    return request({
        url: `properties/${id}`,
        method: 'GET'
    });
}

function store(property) {
    return request({
        url: 'properties',
        method: 'POST',
        data: property
    });
}

function getUserProperties(id) {
    return request({
        url: `properties/user/${id}`,
        method: 'GET'
    });
}

const PropertyService = {
    get, store, getUserProperties
}

export default PropertyService;