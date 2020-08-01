import request from '../lib/request';

function get(id) {
    return request({
        url: `properties/${id}`,
        method: 'GET'
    });
}

function list(id) {
    return request({
        url: `payment-methods/user-cards/${id}`,
        method: 'GET'
    });
}

function store(objPaymentMethod) {
    return request({
        url: 'payment-methods',
        method: 'POST',
        data: objPaymentMethod
    });
}

function getUserPaymentMethods(id) {
    return request({
        url: `properties/user/${id}`,
        method: 'GET'
    });
}

function getPredeterminedSource(id) {
    return request({
        url: `payment-methods/user-predetermined/${id}`,
        method: 'GET'
    })
}

function setPredeterminedSource(id) {
    return request({
        url: `payment-methods/predetermined/${id}`,
        method: 'GET'
    })
}

const PaymentMethodService = {
    get, list, store, getUserPaymentMethods, setPredeterminedSource, getPredeterminedSource
}

export default PaymentMethodService;