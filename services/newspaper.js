const axios = require('axios');
import sendRequest from './sendRequest'

const newspaperService = {
    getNewspaperList: async function () {
        return sendRequest.get('/api/promotion').then((response) => {
            return response
        }).catch(error => {
            return error
        })
    },

    getNewspaperListBySearch: async function (data) {
        return await sendRequest.post('/api/promotion/newspaper', data)
    }
}

export default newspaperService