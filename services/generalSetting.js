import request from '../lib/request';

function getAll() {
    return request({
        url: 'general-settings/list',
        method: 'GET'
    });
}

const GeneralSettingService = {
    getAll,
}

export default GeneralSettingService;