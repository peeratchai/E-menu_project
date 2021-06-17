const axios = require('axios');
import sendRequest from './sendRequest'

const newspaperService = {
    getNewspaperList: async function () {
        return await sendRequest.get('/api/promotion')
    },

    getNewspaperListBySearch: async function (data) {
        return await sendRequest.post('/api/promotion/newspaper', data)
    },

    getNewspaperListBySearchWithPaging: async function (page, limit, data) {
        return await sendRequest.post('/api/promotion/newspaper_with_paging/' + page + "/" + limit, data)
    }
}

export default newspaperService