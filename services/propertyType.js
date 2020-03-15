import request from '../lib/request';

function getAll() {
    return request({
        url: 'properties-types',
        method: 'GET'
    });
}

const PropertyTypeService = {
    getAll
}

export default PropertyTypeService;