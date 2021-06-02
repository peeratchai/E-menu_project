const axios = require('axios');
import sendRequest from './sendRequest'

const newspaperService = {
    getNewspaperList: async function () {
        return await sendRequest.get('/api/promotion')
    },

    getNewspaperListBySearch: async function (data) {
        return await sendRequest.post('/api/promotion/newspaper', data)
    }
}

export default newspaperService