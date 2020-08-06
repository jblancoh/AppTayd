import request from '../lib/request';

function get(id) {
    return request({
        url: `properties/${id}`,
        method: 'GET'
    });
}

function listScheduled(id) {
    return request({
        url: `services/list-scheduled/${id}`,
        method: 'GET'
    });
}

function listHistory(id) {
    return request({
        url: `services/list-history/${id}`,
        method: 'GET'
    });
}

function store(objService) {
    return request({
        url: 'services',
        method: 'POST',
        data: objService
    });
}

function getUserPaymentMethods(id) {
    return request({
        url: `properties/user/${id}`,
        method: 'GET'
    });
}

const ServicesService = {
    get, listScheduled, listHistory, store, getUserPaymentMethods,
}

export default ServicesService;